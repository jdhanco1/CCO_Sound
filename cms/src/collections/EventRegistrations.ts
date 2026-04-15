import type { CollectionConfig } from 'payload'

export const EventRegistrations: CollectionConfig = {
  slug: 'event-registrations',
  admin: { useAsTitle: 'name' },
  access: {
    read: () => true,
    create: () => true,
  },
  hooks: {
    afterOperation: [
      async ({ operation, result, req }) => {
        if (operation !== 'create') return result
        try {
          const settings = await req.payload.findGlobal({ slug: 'site-settings' as any })
          const recipients: { email: string }[] =
            (settings as any)?.contactNotificationEmails ?? []
          if (recipients.length === 0) return result

          const toAddresses = recipients.map((r) => r.email).join(', ')
          const { name, email, phone, numberOfAttendees, notes, event } = result as any

          // Resolve event name if it's a relationship
          let eventName = 'Unknown Event'
          if (event && typeof event === 'object' && event.title) {
            eventName = event.title
          } else if (event) {
            try {
              const eventDoc = await req.payload.findByID({
                collection: 'events' as any,
                id: typeof event === 'object' ? event.id : event,
              })
              eventName = (eventDoc as any)?.title || eventName
            } catch { /* ignore lookup failure */ }
          }

          await req.payload.sendEmail({
            to: toAddresses,
            subject: `New Event Registration: ${eventName}`,
            html: `
              <h2>New Event Registration</h2>
              <table style="border-collapse:collapse;width:100%;max-width:600px">
                <tr><td style="padding:8px;font-weight:bold">Event</td><td style="padding:8px">${eventName}</td></tr>
                <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
                <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
                ${phone ? `<tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${phone}</td></tr>` : ''}
                <tr><td style="padding:8px;font-weight:bold">Attendees</td><td style="padding:8px">${numberOfAttendees || 1}</td></tr>
                ${notes ? `<tr><td style="padding:8px;font-weight:bold;vertical-align:top">Notes</td><td style="padding:8px;white-space:pre-wrap">${notes}</td></tr>` : ''}
              </table>
            `,
          })
        } catch (err) {
          req.payload.logger.error(`Event registration email notification failed: ${err}`)
        }
        return result
      },
    ],
  },
  fields: [
    { name: 'event', type: 'relationship', relationTo: 'events', required: true },
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'numberOfAttendees', type: 'number', defaultValue: 1 },
    { name: 'notes', type: 'textarea' },
  ],
}
