import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
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
          // Load notification recipients from Site Settings global
          const settings = await req.payload.findGlobal({ slug: 'site-settings' })
          const recipients: { email: string }[] =
            (settings as any)?.contactNotificationEmails ?? []
          if (recipients.length === 0) return result

          const toAddresses = recipients.map((r) => r.email).join(', ')
          const { name, email, phone, subject, message } = result as any

          await req.payload.sendEmail({
            to: toAddresses,
            subject: `New Contact Form Submission${subject ? ': ' + subject : ''}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <table style="border-collapse:collapse;width:100%;max-width:600px">
                <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
                <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
                ${phone ? `<tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${phone}</td></tr>` : ''}
                ${subject ? `<tr><td style="padding:8px;font-weight:bold">Subject</td><td style="padding:8px">${subject}</td></tr>` : ''}
                <tr><td style="padding:8px;font-weight:bold;vertical-align:top">Message</td><td style="padding:8px;white-space:pre-wrap">${message}</td></tr>
              </table>
            `,
          })
        } catch (err) {
          // Never let email failure break the form submission
          req.payload.logger.error(`Contact email notification failed: ${err}`)
        }
        return result
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'subject', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
  ],
}
