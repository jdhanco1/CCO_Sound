/**
 * Seed script for Community Church Oxford Strapi CMS.
 *
 * Run AFTER Strapi is set up and content types are created:
 *   node cms/seed.js
 *
 * This uses the Strapi REST API to populate initial data
 * so the React frontend has content to display immediately.
 *
 * Prerequisites:
 *   1. Strapi running at http://localhost:1337
 *   2. All content types created via Content-Type Builder
 *   3. API token with full access (create one in Settings → API Tokens)
 *   4. Set STRAPI_TOKEN below or pass as env var
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || 'YOUR_FULL_ACCESS_TOKEN';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${STRAPI_TOKEN}`,
};

async function post(endpoint, data) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`  ✗ ${endpoint}: ${err}`);
    return null;
  }
  const json = await res.json();
  console.log(`  ✓ ${endpoint}: ${data.name || data.title || 'ok'}`);
  return json;
}

async function seed() {
  console.log('\n🌱 Seeding Community Church Oxford CMS...\n');

  // ── Staff Members ──────────────────────────────────────
  console.log('Staff Members:');
  const staff = [
    { name: 'Fish Robinson', title: 'Lead Pastor/Teaching Elder', order: 1 },
    { name: 'Peggie Wilson', title: 'Ministry Coordinator & Office Coordinator', order: 2 },
    { name: 'Javi Sanchez', title: 'Media Production Director & Director of Spanish Ministry', order: 3 },
    { name: 'Ryan Watson', title: 'Associate Pastor to Families & Discipleship', order: 4 },
    { name: 'Kelsey Cooper', title: 'Student Ministry Team Member', order: 5 },
    { name: 'Lyndsey Thompson', title: 'Minister to College Students', order: 6 },
    { name: 'Grayson Inman', title: 'Associate Pastor to Students & Worship', order: 7 },
    { name: 'Beth Robinson', title: 'Creative Director & Women\'s Ministry Director', order: 8 },
  ];
  for (const s of staff) await post('staff-members', s);

  // ── Elders ─────────────────────────────────────────────
  console.log('\nElders:');
  const elders = [
    { name: 'Fish Robinson', title: 'Elder', order: 1 },
    { name: 'John Youngblood', title: 'Elder', order: 2 },
    { name: 'Guy Billups', title: 'Elder', order: 3 },
    { name: 'Braden Theobald', title: 'Elder', order: 4 },
    { name: 'Keith DePriest', title: 'Elder', order: 5 },
    { name: 'Jarred Hancock', title: 'Elder', order: 6 },
    { name: 'Brian Rhodes', title: 'Elder', order: 7 },
    { name: 'Javi Sanchez', title: 'Elder', order: 8 },
  ];
  for (const e of elders) await post('elders', e);

  // ── Ministries ─────────────────────────────────────────
  console.log('\nMinistries:');
  const ministries = [
    {
      name: 'Community Groups',
      description: 'Community Groups are designed for you to connect with other people on a more personal level and do life together. Groups are typically 10-15 people, meeting in people\'s homes or the church office throughout the week. This is an opportunity for you not only to grow relationships with other people, but a chance for you to grow deeper in your faith through discipleship.',
      schedule: 'Various days throughout the week',
      order: 1,
    },
    {
      name: "Men's Ministry",
      description: 'We believe it is good and healthy to continue relationships with other Godly men. We typically meet the second and fourth Mondays of each month to hang out, eat, learn more about Biblical manhood and encourage each other to become more Godly men.',
      schedule: '2nd & 4th Mondays, 6:00 PM at office building',
      order: 2,
    },
    {
      name: "Women's Ministry",
      description: 'We offer Ladies\' Bible Studies, Exhale events (Ladies\' Night Out, classes, events) and Ladies\' Book Club. No matter what season of life you are in, all ladies love some quality "girl time." What better way than to spend that time with other women learning more about who God has called them to be.',
      order: 3,
    },
    {
      name: 'Next Gen (Children)',
      description: 'We want to work alongside parents to give their children Biblical knowledge of who God truly is. Children are the next generation of our church, so we want to do everything we can to lead them into a growing relationship with Jesus Christ. We offer classes for children (infants through 5th grade) during our Sunday morning services.',
      schedule: 'Sunday mornings during service',
      order: 4,
    },
    {
      name: 'Mission Kids',
      description: 'Mission Kids is our mid-week gathering for children (Kindergarten through 5th grade). We use The Gospel Project for Kids curriculum, aiming to teach children through the entirety of Scripture over a three-year period. Dinner is provided.',
      schedule: 'Wednesdays 5:30-7:30 PM at Lafayette Middle School',
      order: 5,
    },
    {
      name: 'CCO Students (6th-12th Grade)',
      description: 'The years between 6th and 12th grade are a crucial time in the life of a student. Our ministry is centered around John 17:3: "And this is eternal life, that they know you, the only true God, and Jesus Christ whom you have sent." We want to lead students towards Jesus and help give them a Biblical worldview.',
      schedule: 'Wednesdays 5:30-7:30 PM at church office',
      order: 6,
    },
    {
      name: 'College Ministry',
      description: 'Oxford, Mississippi is a college town with close to 100 nations represented among its students. We love for college students to get plugged in at CCO! We have Community Groups designed specifically for college students, as well as opportunities to serve and do life with others.',
      order: 7,
    },
    {
      name: 'Serve Teams',
      description: 'Because we meet in a school, many of our elements are portable. We have teams that help with load-in/load-out, greeting, parking, and making coffee. Sunday mornings do not happen without our volunteers. This is an easy, practical way to be involved and serve at Community.',
      schedule: 'Sunday mornings',
      order: 8,
    },
  ];
  for (const m of ministries) await post('ministries', m);

  // ── Home Page (single type) ────────────────────────────
  console.log('\nHome Page:');
  await post('home-page', {
    heroTagline: 'Seek · Shape · Send',
    heroSubtitle: 'A Christ-centered church in Oxford, Mississippi',
    aboutHeading: 'Welcome to Community',
    aboutText: 'At Community Church Oxford, our mission is to Seek, Shape, and Send. We are a family of Christ-followers committed to sharing the Gospel in Oxford, MS and beyond.',
    serviceTime: '9:45 AM',
    serviceLocation: 'Lafayette High School Gym · Oxford, MS',
  });

  // ── Mission Page (single type) ─────────────────────────
  console.log('\nMission Page:');
  await post('mission-page', {
    introText: 'The phrase "Seek, Shape, Send" is a clear, concise way for us to state our mission. We believe these three words are not only a reminder of what God has done for us, but also great markers and goals for how we are to live our lives.',
    essentialsCta: 'Want to know more about Community? Register for our next Essentials Class.',
    essentialsFormUrl: 'https://communityoxford.ccbchurch.com/form_response.php?id=23',
  });

  console.log('\n✅ Seeding complete!\n');
  console.log('Next steps:');
  console.log('  1. Upload staff/elder photos in Strapi admin');
  console.log('  2. Add ministry images');
  console.log('  3. Create sermons & blog posts');
  console.log('  4. Set Public API permissions (Settings → Roles → Public)');
  console.log('  5. Create a read-only API token for the frontend\n');
}

seed().catch(console.error);
