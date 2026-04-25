const fs = require('fs');
const path = require('path');

const PHONE = '09740583538';
const WA_NUMBER = '919740583538';
const EMAIL = 'akarsh.bilimagga@gmail.com';
const DOMAIN = 'https://kamakshidental.in';

const locationProfiles = {
  'Indiranagar': {
    slug: 'indiranagar',
    area: 'New Tippasandra, Indiranagar',
    pin: '560075',
    phone: '08123-122155',
    landmarks: '100 Feet Road, Indiranagar Metro Station',
  },
  'RR Nagar': {
    slug: 'rr-nagar',
    area: 'BEML Layout, Rajarajeshwari Nagar',
    pin: '560098',
    phone: '08123-322155',
    landmarks: 'Gopalan Arcade Mall, BEML Layout',
  },
  'MG Road': {
    slug: 'mg-road',
    area: 'Shanthala Nagar, Ashok Nagar',
    pin: '560001',
    phone: '08123-222155',
    landmarks: 'Brigade Road, MG Road Metro Station',
  },
  'Bangalore': {
    slug: 'bangalore',
    area: 'Indiranagar, RR Nagar, MG Road',
    pin: '',
    phone: PHONE,
    landmarks: '3 locations across Bengaluru',
  },
};

function formatLocationTitle(location) {
  return location === 'Bangalore' ? 'Bangalore' : `${location} Bangalore`;
}

function createPage({
  slug,
  title,
  location,
  service,
  faqService,
  area,
  pin,
  phone,
  landmarks,
}) {
  const profile = locationProfiles[location];
  return {
    slug,
    title,
    location,
    service,
    faqService: faqService || service,
    area: area || profile.area,
    pin: pin !== undefined ? pin : profile.pin,
    phone: phone || profile.phone,
    landmarks: landmarks || profile.landmarks,
  };
}

function buildLocationGroup({ baseSlug, titlePrefix, service, faqService, locations }) {
  return locations.map((location) =>
    createPage({
      slug: `${baseSlug}-${locationProfiles[location].slug}`,
      title: `${titlePrefix} in ${formatLocationTitle(location)}`,
      location,
      service,
      faqService,
    })
  );
}

// ============================================================
// ALL PAGE DEFINITIONS — Zomato/Pepperfry style
// Each page = one keyword = one URL
// ============================================================
const pages = [

  // ── INDIRANAGAR LOCATION PAGES ──
  { slug: 'dental-clinic-indiranagar',          title: 'Dental Clinic in Indiranagar Bangalore',                  location: 'Indiranagar', service: 'General Dentistry',      area: 'New Tippasandra, Indiranagar', pin: '560075', phone: '08123-122155', landmarks: '100 Feet Road, Indiranagar Metro Station' },
  { slug: 'dentist-indiranagar',                title: 'Best Dentist in Indiranagar Bangalore',                   location: 'Indiranagar', service: 'General Dentistry',      area: 'New Tippasandra, Indiranagar', pin: '560075', phone: '08123-122155', landmarks: '100 Feet Road, Indiranagar Metro Station' },
  { slug: 'dental-implants-indiranagar',        title: 'Dental Implants in Indiranagar Bangalore',                location: 'Indiranagar', service: 'Dental Implants',        area: 'New Tippasandra, Indiranagar', pin: '560075', phone: '08123-122155', landmarks: '100 Feet Road, Indiranagar Metro Station' },
  { slug: 'invisalign-indiranagar',             title: 'Invisalign in Indiranagar Bangalore',                     location: 'Indiranagar', service: 'Invisalign',             area: 'New Tippasandra, Indiranagar', pin: '560075', phone: '08123-122155', landmarks: '100 Feet Road, Indiranagar Metro Station' },
  { slug: 'root-canal-indiranagar',             title: 'Root Canal Treatment in Indiranagar Bangalore',           location: 'Indiranagar', service: 'Root Canal Treatment',   area: 'New Tippasandra, Indiranagar', pin: '560075', phone: '08123-122155', landmarks: '100 Feet Road, Indiranagar Metro Station' },
  { slug: 'teeth-whitening-indiranagar',        title: 'Teeth Whitening in Indiranagar Bangalore',                location: 'Indiranagar', service: 'Teeth Whitening',        area: 'New Tippasandra, Indiranagar', pin: '560075', phone: '08123-122155', landmarks: '100 Feet Road, Indiranagar Metro Station' },
  { slug: 'porcelain-veneers-indiranagar',      title: 'Porcelain Veneers in Indiranagar Bangalore',              location: 'Indiranagar', service: 'Porcelain Veneers',      area: 'New Tippasandra, Indiranagar', pin: '560075', phone: '08123-122155', landmarks: '100 Feet Road, Indiranagar Metro Station' },
  { slug: 'single-visit-dentistry-indiranagar', title: 'Single Visit Dentistry in Indiranagar Bangalore',         location: 'Indiranagar', service: 'Single Visit Dentistry', area: 'New Tippasandra, Indiranagar', pin: '560075', phone: '08123-122155', landmarks: '100 Feet Road, Indiranagar Metro Station' },
  { slug: 'dentist-new-tippasandra',            title: 'Dentist in New Tippasandra Bangalore',                    location: 'Indiranagar', service: 'General Dentistry',      area: 'New Tippasandra, Indiranagar', pin: '560075', phone: '08123-122155', landmarks: '100 Feet Road, Indiranagar Metro Station' },
  { slug: 'dental-clinic-hal',                  title: 'Dental Clinic near HAL Bangalore',                        location: 'Indiranagar', service: 'General Dentistry',      area: 'New Tippasandra, Indiranagar', pin: '560075', phone: '08123-122155', landmarks: 'HAL Airport Road, Indiranagar' },
  { slug: 'dentist-domlur',                     title: 'Dentist near Domlur Bangalore',                           location: 'Indiranagar', service: 'General Dentistry',      area: 'New Tippasandra, Indiranagar', pin: '560075', phone: '08123-122155', landmarks: 'Domlur, Indiranagar' },
  { slug: 'dental-clinic-100-feet-road',        title: 'Dental Clinic near 100 Feet Road Bangalore',             location: 'Indiranagar', service: 'General Dentistry',      area: 'New Tippasandra, Indiranagar', pin: '560075', phone: '08123-122155', landmarks: '100 Feet Road Indiranagar' },
  { slug: 'braces-indiranagar',                 title: 'Dental Braces in Indiranagar Bangalore',                  location: 'Indiranagar', service: 'Dental Braces',         area: 'New Tippasandra, Indiranagar', pin: '560075', phone: '08123-122155', landmarks: '100 Feet Road, Indiranagar Metro Station' },
  { slug: 'smile-correction-indiranagar',       title: 'Smile Correction in Indiranagar Bangalore',               location: 'Indiranagar', service: 'Smile Correction',      area: 'New Tippasandra, Indiranagar', pin: '560075', phone: '08123-122155', landmarks: '100 Feet Road, Indiranagar Metro Station' },
  { slug: 'dental-crown-indiranagar',           title: 'Dental Crown in Indiranagar Bangalore',                   location: 'Indiranagar', service: 'Dental Crown',          area: 'New Tippasandra, Indiranagar', pin: '560075', phone: '08123-122155', landmarks: '100 Feet Road, Indiranagar Metro Station' },

  // ── RR NAGAR LOCATION PAGES ──
  { slug: 'dental-clinic-rr-nagar',             title: 'Dental Clinic in RR Nagar Bangalore',                     location: 'RR Nagar',    service: 'General Dentistry',      area: 'BEML Layout, Rajarajeshwari Nagar', pin: '560098', phone: '08123-322155', landmarks: 'Gopalan Arcade Mall, BEML Layout' },
  { slug: 'dentist-rr-nagar',                   title: 'Best Dentist in RR Nagar Bangalore',                      location: 'RR Nagar',    service: 'General Dentistry',      area: 'BEML Layout, Rajarajeshwari Nagar', pin: '560098', phone: '08123-322155', landmarks: 'Gopalan Arcade Mall, BEML Layout' },
  { slug: 'dental-clinic-rajarajeshwari-nagar', title: 'Dental Clinic in Rajarajeshwari Nagar Bangalore',         location: 'RR Nagar',    service: 'General Dentistry',      area: 'BEML Layout, Rajarajeshwari Nagar', pin: '560098', phone: '08123-322155', landmarks: 'Gopalan Arcade Mall, BEML Layout' },
  { slug: 'dental-implants-rr-nagar',           title: 'Dental Implants in RR Nagar Bangalore',                   location: 'RR Nagar',    service: 'Dental Implants',        area: 'BEML Layout, Rajarajeshwari Nagar', pin: '560098', phone: '08123-322155', landmarks: 'Gopalan Arcade Mall, BEML Layout' },
  { slug: 'invisalign-rr-nagar',                title: 'Invisalign in RR Nagar Bangalore',                        location: 'RR Nagar',    service: 'Invisalign',             area: 'BEML Layout, Rajarajeshwari Nagar', pin: '560098', phone: '08123-322155', landmarks: 'Gopalan Arcade Mall, BEML Layout' },
  { slug: 'root-canal-rr-nagar',                title: 'Root Canal Treatment in RR Nagar Bangalore',              location: 'RR Nagar',    service: 'Root Canal Treatment',   area: 'BEML Layout, Rajarajeshwari Nagar', pin: '560098', phone: '08123-322155', landmarks: 'Gopalan Arcade Mall, BEML Layout' },
  { slug: 'teeth-whitening-rr-nagar',           title: 'Teeth Whitening in RR Nagar Bangalore',                   location: 'RR Nagar',    service: 'Teeth Whitening',        area: 'BEML Layout, Rajarajeshwari Nagar', pin: '560098', phone: '08123-322155', landmarks: 'Gopalan Arcade Mall, BEML Layout' },
  { slug: 'porcelain-veneers-rr-nagar',         title: 'Porcelain Veneers in RR Nagar Bangalore',                 location: 'RR Nagar',    service: 'Porcelain Veneers',      area: 'BEML Layout, Rajarajeshwari Nagar', pin: '560098', phone: '08123-322155', landmarks: 'Gopalan Arcade Mall, BEML Layout' },
  { slug: 'dental-clinic-beml-layout',          title: 'Dental Clinic near BEML Layout Bangalore',                location: 'RR Nagar',    service: 'General Dentistry',      area: 'BEML Layout, Rajarajeshwari Nagar', pin: '560098', phone: '08123-322155', landmarks: 'BEML Layout, Nagarbhavi' },
  { slug: 'dentist-nagarbhavi',                 title: 'Dentist near Nagarbhavi Bangalore',                        location: 'RR Nagar',    service: 'General Dentistry',      area: 'BEML Layout, Rajarajeshwari Nagar', pin: '560098', phone: '08123-322155', landmarks: 'Nagarbhavi Circle, RR Nagar' },
  { slug: 'dental-clinic-gopalan-arcade',       title: 'Dental Clinic near Gopalan Arcade Bangalore',             location: 'RR Nagar',    service: 'General Dentistry',      area: 'BEML Layout, Rajarajeshwari Nagar', pin: '560098', phone: '08123-322155', landmarks: 'Gopalan Arcade Mall' },
  { slug: 'braces-rr-nagar',                    title: 'Dental Braces in RR Nagar Bangalore',                     location: 'RR Nagar',    service: 'Dental Braces',         area: 'BEML Layout, Rajarajeshwari Nagar', pin: '560098', phone: '08123-322155', landmarks: 'Gopalan Arcade Mall, BEML Layout' },
  { slug: 'single-visit-dentistry-rr-nagar',    title: 'Single Visit Dentistry in RR Nagar Bangalore',            location: 'RR Nagar',    service: 'Single Visit Dentistry', area: 'BEML Layout, Rajarajeshwari Nagar', pin: '560098', phone: '08123-322155', landmarks: 'Gopalan Arcade Mall, BEML Layout' },
  { slug: 'dental-crown-rr-nagar',              title: 'Dental Crown in RR Nagar Bangalore',                      location: 'RR Nagar',    service: 'Dental Crown',          area: 'BEML Layout, Rajarajeshwari Nagar', pin: '560098', phone: '08123-322155', landmarks: 'Gopalan Arcade Mall, BEML Layout' },

  // ── MG ROAD LOCATION PAGES ──
  { slug: 'dental-clinic-mg-road',              title: 'Dental Clinic on MG Road Bangalore',                      location: 'MG Road',     service: 'General Dentistry',      area: 'Shanthala Nagar, Ashok Nagar', pin: '560001', phone: '08123-222155', landmarks: 'Brigade Road, MG Road Metro Station' },
  { slug: 'dentist-mg-road',                    title: 'Best Dentist on MG Road Bangalore',                       location: 'MG Road',     service: 'General Dentistry',      area: 'Shanthala Nagar, Ashok Nagar', pin: '560001', phone: '08123-222155', landmarks: 'Brigade Road, MG Road Metro Station' },
  { slug: 'dental-implants-mg-road',            title: 'Dental Implants on MG Road Bangalore',                    location: 'MG Road',     service: 'Dental Implants',        area: 'Shanthala Nagar, Ashok Nagar', pin: '560001', phone: '08123-222155', landmarks: 'Brigade Road, MG Road Metro Station' },
  { slug: 'invisalign-mg-road',                 title: 'Invisalign on MG Road Bangalore',                         location: 'MG Road',     service: 'Invisalign',             area: 'Shanthala Nagar, Ashok Nagar', pin: '560001', phone: '08123-222155', landmarks: 'Brigade Road, MG Road Metro Station' },
  { slug: 'root-canal-mg-road',                 title: 'Root Canal Treatment on MG Road Bangalore',               location: 'MG Road',     service: 'Root Canal Treatment',   area: 'Shanthala Nagar, Ashok Nagar', pin: '560001', phone: '08123-222155', landmarks: 'Brigade Road, MG Road Metro Station' },
  { slug: 'teeth-whitening-mg-road',            title: 'Teeth Whitening on MG Road Bangalore',                    location: 'MG Road',     service: 'Teeth Whitening',        area: 'Shanthala Nagar, Ashok Nagar', pin: '560001', phone: '08123-222155', landmarks: 'Brigade Road, MG Road Metro Station' },
  { slug: 'porcelain-veneers-mg-road',          title: 'Porcelain Veneers on MG Road Bangalore',                  location: 'MG Road',     service: 'Porcelain Veneers',      area: 'Shanthala Nagar, Ashok Nagar', pin: '560001', phone: '08123-222155', landmarks: 'Brigade Road, MG Road Metro Station' },
  { slug: 'dental-clinic-ashok-nagar',          title: 'Dental Clinic in Ashok Nagar Bangalore',                  location: 'MG Road',     service: 'General Dentistry',      area: 'Shanthala Nagar, Ashok Nagar', pin: '560001', phone: '08123-222155', landmarks: 'Ashok Nagar, Brigade Road' },
  { slug: 'dental-clinic-brigade-road',         title: 'Dental Clinic near Brigade Road Bangalore',               location: 'MG Road',     service: 'General Dentistry',      area: 'Shanthala Nagar, Ashok Nagar', pin: '560001', phone: '08123-222155', landmarks: 'Brigade Road, Commercial Street' },
  { slug: 'dentist-cubbon-park',                title: 'Dentist near Cubbon Park Bangalore',                      location: 'MG Road',     service: 'General Dentistry',      area: 'Shanthala Nagar, Ashok Nagar', pin: '560001', phone: '08123-222155', landmarks: 'Cubbon Park, MG Road' },
  { slug: 'single-visit-dentistry-mg-road',     title: 'Single Visit Dentistry on MG Road Bangalore',             location: 'MG Road',     service: 'Single Visit Dentistry', area: 'Shanthala Nagar, Ashok Nagar', pin: '560001', phone: '08123-222155', landmarks: 'Brigade Road, MG Road Metro Station' },
  { slug: 'braces-mg-road',                     title: 'Dental Braces on MG Road Bangalore',                      location: 'MG Road',     service: 'Dental Braces',         area: 'Shanthala Nagar, Ashok Nagar', pin: '560001', phone: '08123-222155', landmarks: 'Brigade Road, MG Road Metro Station' },
  { slug: 'dental-crown-mg-road',               title: 'Dental Crown on MG Road Bangalore',                       location: 'MG Road',     service: 'Dental Crown',          area: 'Shanthala Nagar, Ashok Nagar', pin: '560001', phone: '08123-222155', landmarks: 'Brigade Road, MG Road Metro Station' },

  // ── CITY-WIDE SERVICE PAGES ──
  { slug: 'dental-implants-bangalore',          title: 'Dental Implants in Bangalore',                            location: 'Bangalore',   service: 'Dental Implants',        area: 'Indiranagar, RR Nagar, MG Road', pin: '',      phone: PHONE,          landmarks: '3 locations across Bengaluru' },
  { slug: 'invisalign-bangalore',               title: 'Invisalign in Bangalore',                                 location: 'Bangalore',   service: 'Invisalign',             area: 'Indiranagar, RR Nagar, MG Road', pin: '',      phone: PHONE,          landmarks: '3 locations across Bengaluru' },
  { slug: 'root-canal-bangalore',               title: 'Root Canal Treatment in Bangalore',                       location: 'Bangalore',   service: 'Root Canal Treatment',   area: 'Indiranagar, RR Nagar, MG Road', pin: '',      phone: PHONE,          landmarks: '3 locations across Bengaluru' },
  { slug: 'teeth-whitening-bangalore',          title: 'Teeth Whitening in Bangalore',                            location: 'Bangalore',   service: 'Teeth Whitening',        area: 'Indiranagar, RR Nagar, MG Road', pin: '',      phone: PHONE,          landmarks: '3 locations across Bengaluru' },
  { slug: 'porcelain-veneers-bangalore',        title: 'Porcelain Veneers in Bangalore',                          location: 'Bangalore',   service: 'Porcelain Veneers',      area: 'Indiranagar, RR Nagar, MG Road', pin: '',      phone: PHONE,          landmarks: '3 locations across Bengaluru' },
  { slug: 'single-visit-dentistry-bangalore',   title: 'Single Visit Dentistry in Bangalore',                     location: 'Bangalore',   service: 'Single Visit Dentistry', area: 'Indiranagar, RR Nagar, MG Road', pin: '',      phone: PHONE,          landmarks: '3 locations across Bengaluru' },
  { slug: 'dental-braces-bangalore',            title: 'Dental Braces in Bangalore',                              location: 'Bangalore',   service: 'Dental Braces',         area: 'Indiranagar, RR Nagar, MG Road', pin: '',      phone: PHONE,          landmarks: '3 locations across Bengaluru' },
  { slug: 'smile-correction-bangalore',         title: 'Smile Correction in Bangalore',                           location: 'Bangalore',   service: 'Smile Correction',      area: 'Indiranagar, RR Nagar, MG Road', pin: '',      phone: PHONE,          landmarks: '3 locations across Bengaluru' },
  { slug: 'clear-aligners-bangalore',           title: 'Clear Aligners in Bangalore',                             location: 'Bangalore',   service: 'Clear Aligners',        area: 'Indiranagar, RR Nagar, MG Road', pin: '',      phone: PHONE,          landmarks: '3 locations across Bengaluru' },
  { slug: 'cerec-crowns-bangalore',             title: 'CEREC Same Day Crowns in Bangalore',                      location: 'Bangalore',   service: 'CEREC Crowns',          area: 'Indiranagar, RR Nagar, MG Road', pin: '',      phone: PHONE,          landmarks: '3 locations across Bengaluru' },
  { slug: 'preventive-dental-care-bangalore',   title: 'Preventive Dental Care in Bangalore',                     location: 'Bangalore',   service: 'Preventive Care',       area: 'Indiranagar, RR Nagar, MG Road', pin: '',      phone: PHONE,          landmarks: '3 locations across Bengaluru' },
  { slug: 'best-dental-clinic-bangalore',       title: 'Best Dental Clinic in Bangalore',                         location: 'Bangalore',   service: 'General Dentistry',      area: 'Indiranagar, RR Nagar, MG Road', pin: '',      phone: PHONE,          landmarks: '3 locations across Bengaluru' },
  { slug: 'dentist-bangalore',                  title: 'Best Dentist in Bangalore',                               location: 'Bangalore',   service: 'General Dentistry',      area: 'Indiranagar, RR Nagar, MG Road', pin: '',      phone: PHONE,          landmarks: '3 locations across Bengaluru' },
  { slug: 'waterlase-laser-dentistry-bangalore',title: 'Waterlase Laser Dentistry in Bangalore',                  location: 'Bangalore',   service: 'Laser Dentistry',       area: 'Indiranagar, RR Nagar, MG Road', pin: '',      phone: PHONE,          landmarks: '3 locations across Bengaluru' },
  { slug: 'painless-dentistry-bangalore',       title: 'Painless Dentistry in Bangalore',                         location: 'Bangalore',   service: 'Painless Dentistry',    area: 'Indiranagar, RR Nagar, MG Road', pin: '',      phone: PHONE,          landmarks: '3 locations across Bengaluru' },
];

pages.push(
  ...buildLocationGroup({
    baseSlug: 'dentist-near-me',
    titlePrefix: 'Dentist Near Me',
    service: 'Dentist Near Me',
    faqService: 'General Dentistry',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: 'dental-clinic-near-me',
    titlePrefix: 'Dental Clinic Near Me',
    service: 'Dental Clinic Near Me',
    faqService: 'General Dentistry',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: 'emergency-dentist-near-me',
    titlePrefix: 'Emergency Dentist Near Me',
    service: 'Emergency Dentist',
    faqService: 'Emergency Dentistry',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: '24-hour-dentist',
    titlePrefix: '24 Hour Dentist',
    service: '24 Hour Dentist',
    faqService: 'Emergency Dentistry',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: 'dentist-open-now',
    titlePrefix: 'Dentist Open Now',
    service: 'Dentist Open Now',
    faqService: 'Emergency Dentistry',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: 'best-dentist',
    titlePrefix: 'Best Dentist',
    service: 'General Dentistry',
    faqService: 'General Dentistry',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: 'top-dentist',
    titlePrefix: 'Top Dentist',
    service: 'General Dentistry',
    faqService: 'General Dentistry',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: 'top-rated-dentist',
    titlePrefix: 'Top Rated Dentist',
    service: 'General Dentistry',
    faqService: 'General Dentistry',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: 'best-dental-clinic',
    titlePrefix: 'Best Dental Clinic',
    service: 'General Dentistry',
    faqService: 'General Dentistry',
    locations: ['Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: 'dental-implant-cost',
    titlePrefix: 'Dental Implant Cost',
    service: 'Dental Implant Cost',
    faqService: 'Dental Implants',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: 'tooth-pain-treatment',
    titlePrefix: 'Tooth Pain Treatment',
    service: 'Tooth Pain Treatment',
    faqService: 'Root Canal Treatment',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: 'gum-treatment',
    titlePrefix: 'Gum Treatment',
    service: 'Gum Treatment',
    faqService: 'Gum Treatment',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: 'missing-teeth-treatment',
    titlePrefix: 'Missing Teeth Treatment',
    service: 'Missing Teeth Treatment',
    faqService: 'Dental Implants',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: 'crooked-teeth-treatment',
    titlePrefix: 'Crooked Teeth Treatment',
    service: 'Crooked Teeth Treatment',
    faqService: 'Crooked Teeth Treatment',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: 'bad-breath-treatment',
    titlePrefix: 'Bad Breath Treatment',
    service: 'Bad Breath Treatment',
    faqService: 'Bad Breath Treatment',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: 'root-canal-cost',
    titlePrefix: 'Root Canal Cost',
    service: 'Root Canal Cost',
    faqService: 'Root Canal Treatment',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: 'braces-cost',
    titlePrefix: 'Braces Cost',
    service: 'Braces Cost',
    faqService: 'Dental Braces',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: 'invisalign-cost',
    titlePrefix: 'Invisalign Cost',
    service: 'Invisalign Cost',
    faqService: 'Invisalign',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: 'teeth-whitening-cost',
    titlePrefix: 'Teeth Whitening Cost',
    service: 'Teeth Whitening Cost',
    faqService: 'Teeth Whitening',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar', 'MG Road'],
  }),
  ...buildLocationGroup({
    baseSlug: 'best-dental-implants',
    titlePrefix: 'Best Dental Implants',
    service: 'Dental Implants',
    faqService: 'Dental Implants',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar'],
  }),
  createPage({
    slug: 'best-root-canal-treatment-bangalore',
    title: 'Best Root Canal Treatment in Bangalore',
    location: 'Bangalore',
    service: 'Root Canal Treatment',
    faqService: 'Root Canal Treatment',
  }),
  createPage({
    slug: 'best-root-canal-indiranagar',
    title: 'Best Root Canal in Indiranagar Bangalore',
    location: 'Indiranagar',
    service: 'Root Canal Treatment',
    faqService: 'Root Canal Treatment',
  }),
  createPage({
    slug: 'best-root-canal-rr-nagar',
    title: 'Best Root Canal in RR Nagar Bangalore',
    location: 'RR Nagar',
    service: 'Root Canal Treatment',
    faqService: 'Root Canal Treatment',
  }),
  createPage({
    slug: 'best-braces-treatment-bangalore',
    title: 'Best Braces Treatment in Bangalore',
    location: 'Bangalore',
    service: 'Dental Braces',
    faqService: 'Dental Braces',
  }),
  createPage({
    slug: 'best-braces-indiranagar',
    title: 'Best Braces in Indiranagar Bangalore',
    location: 'Indiranagar',
    service: 'Dental Braces',
    faqService: 'Dental Braces',
  }),
  createPage({
    slug: 'best-braces-rr-nagar',
    title: 'Best Braces in RR Nagar Bangalore',
    location: 'RR Nagar',
    service: 'Dental Braces',
    faqService: 'Dental Braces',
  }),
  ...buildLocationGroup({
    baseSlug: 'best-invisalign',
    titlePrefix: 'Best Invisalign',
    service: 'Invisalign',
    faqService: 'Invisalign',
    locations: ['Bangalore', 'Indiranagar', 'RR Nagar'],
  }),
  createPage({
    slug: 'dentist-near-brigade-road',
    title: 'Dentist near Brigade Road Bangalore',
    location: 'MG Road',
    service: 'General Dentistry',
    faqService: 'General Dentistry',
    area: 'Brigade Road, Ashok Nagar',
    landmarks: 'Brigade Road and MG Road Metro Station',
  }),
  createPage({
    slug: 'dentist-near-church-street',
    title: 'Dentist near Church Street Bangalore',
    location: 'MG Road',
    service: 'General Dentistry',
    faqService: 'General Dentistry',
    area: 'Church Street, Ashok Nagar',
    landmarks: 'Church Street and MG Road Metro Station',
  }),
  createPage({
    slug: 'dentist-near-cubbon-park',
    title: 'Dentist near Cubbon Park Bangalore',
    location: 'MG Road',
    service: 'General Dentistry',
    faqService: 'General Dentistry',
    area: 'Cubbon Park, Ashok Nagar',
    landmarks: 'Cubbon Park and MG Road',
  }),
  createPage({
    slug: 'dentist-near-hal-bangalore',
    title: 'Dentist near HAL Bangalore',
    location: 'Indiranagar',
    service: 'General Dentistry',
    faqService: 'General Dentistry',
    area: 'HAL, New Tippasandra, Indiranagar',
    landmarks: 'HAL Airport Road, Indiranagar',
  }),
  createPage({
    slug: 'dentist-near-100-ft-road-indiranagar',
    title: 'Dentist near 100 Ft Road Indiranagar Bangalore',
    location: 'Indiranagar',
    service: 'General Dentistry',
    faqService: 'General Dentistry',
    area: '100 Ft Road, Indiranagar',
    landmarks: '100 Ft Road and Indiranagar Metro Station',
  }),
  createPage({
    slug: 'dentist-near-mysore-road',
    title: 'Dentist near Mysore Road Bangalore',
    location: 'RR Nagar',
    service: 'General Dentistry',
    faqService: 'General Dentistry',
    area: 'Mysore Road, RR Nagar',
    landmarks: 'Mysore Road and Rajarajeshwari Nagar',
  }),
  createPage({
    slug: 'dentist-near-beml-layout',
    title: 'Dentist near BEML Layout Bangalore',
    location: 'RR Nagar',
    service: 'General Dentistry',
    faqService: 'General Dentistry',
    area: 'BEML Layout, Rajarajeshwari Nagar',
    landmarks: 'BEML Layout and Gopalan Arcade',
  }),
  createPage({
    slug: 'dental-clinic-near-brigade-road',
    title: 'Dental Clinic near Brigade Road Bangalore',
    location: 'MG Road',
    service: 'General Dentistry',
    faqService: 'General Dentistry',
    area: 'Brigade Road, Ashok Nagar',
    landmarks: 'Brigade Road and MG Road Metro Station',
  }),
  createPage({
    slug: 'dental-clinic-near-church-street',
    title: 'Dental Clinic near Church Street Bangalore',
    location: 'MG Road',
    service: 'General Dentistry',
    faqService: 'General Dentistry',
    area: 'Church Street, Ashok Nagar',
    landmarks: 'Church Street and MG Road Metro Station',
  }),
  createPage({
    slug: 'dental-clinic-near-cubbon-park',
    title: 'Dental Clinic near Cubbon Park Bangalore',
    location: 'MG Road',
    service: 'General Dentistry',
    faqService: 'General Dentistry',
    area: 'Cubbon Park, Ashok Nagar',
    landmarks: 'Cubbon Park and MG Road',
  }),
  createPage({
    slug: 'dental-clinic-near-hal-bangalore',
    title: 'Dental Clinic near HAL Bangalore',
    location: 'Indiranagar',
    service: 'General Dentistry',
    faqService: 'General Dentistry',
    area: 'HAL, New Tippasandra, Indiranagar',
    landmarks: 'HAL Airport Road, Indiranagar',
  }),
  createPage({
    slug: 'dental-clinic-near-mysore-road',
    title: 'Dental Clinic near Mysore Road Bangalore',
    location: 'RR Nagar',
    service: 'General Dentistry',
    faqService: 'General Dentistry',
    area: 'Mysore Road, RR Nagar',
    landmarks: 'Mysore Road and Rajarajeshwari Nagar',
  }),
);

// ============================================================
// FAQ CONTENT PER SERVICE
// ============================================================
const faqs = {
  'General Dentistry': [
    { q: `Where is Kamakshi Dental located?`, a: `Kamakshi Dental has 3 clinics across Bengaluru — Indiranagar (New Tippasandra), RR Nagar (BEML Layout), and MG Road (Ashok Nagar). Call ${PHONE} for directions.` },
    { q: `What are the clinic timings?`, a: `All Kamakshi Dental clinics are open Monday to Saturday, 9:00 AM to 8:00 PM. Call ${PHONE} or WhatsApp for same-day appointments.` },
    { q: `Does Kamakshi Dental offer same-day appointments?`, a: `Yes. Same-day and walk-in appointments are often available. Call ${PHONE} or WhatsApp us to check availability.` },
    { q: `Who is the lead dentist at Kamakshi Dental?`, a: `Dr. Akarsh Bilimagga — MDS Periodontics and Oral Implantology specialist with 8+ years of experience and 10,000+ procedures completed.` },
    { q: `How do I book an appointment at Kamakshi Dental?`, a: `WhatsApp ${PHONE} or call us directly. Our team confirms your appointment within 30 minutes.` },
  ],
  'Emergency Dentistry': [
    { q: `Do you offer same-day emergency dental appointments?`, a: `Yes. Kamakshi Dental offers same-day emergency dental appointments across Indiranagar, RR Nagar, and MG Road, subject to availability. Call or WhatsApp ${PHONE}.` },
    { q: `What problems count as a dental emergency?`, a: `Severe tooth pain, swelling, broken teeth, bleeding gums, knocked-out teeth, and sudden infections are all dental emergencies that should be examined quickly.` },
    { q: `Are your clinics open for urgent dental care?`, a: `All Kamakshi Dental clinics are open Monday to Saturday from 9:00 AM to 8:00 PM. Contact ${PHONE} first so our team can guide you to the right clinic.` },
    { q: `Can emergency tooth pain be treated without long waiting times?`, a: `Yes. Our team triages urgent cases quickly and recommends the fastest available appointment slot for pain relief and diagnosis.` },
    { q: `How do I book an emergency dental appointment?`, a: `Call or WhatsApp ${PHONE}. Mention your symptoms and location so our team can arrange the earliest suitable appointment.` },
  ],
  'Dental Implants': [
    { q: `Are dental implants available in this area?`, a: `Yes. Kamakshi Dental offers dental implants at Indiranagar, RR Nagar, and MG Road clinics. Dr. Akarsh Bilimagga — MDS Oral Implantology — leads all implant procedures. Call ${PHONE}.` },
    { q: `How long does a dental implant procedure take?`, a: `The surgical placement takes 45–90 minutes. The final CEREC crown can be fitted in a single subsequent visit. Total treatment depends on healing time.` },
    { q: `Are dental implants painful?`, a: `No. The procedure is performed under local anaesthesia. Most patients report less discomfort than a tooth extraction.` },
    { q: `How many successful implants has Kamakshi Dental done?`, a: `Dr. Akarsh Bilimagga has completed over 2,000 successful implant procedures at Kamakshi Dental's Bengaluru clinics.` },
    { q: `How do I book a dental implant consultation?`, a: `WhatsApp or call ${PHONE}. Free consultation available at all 3 Bengaluru locations.` },
  ],
  'Invisalign': [
    { q: `Is Kamakshi Dental a certified Invisalign provider?`, a: `Yes. Kamakshi Dental is a certified Invisalign provider with clinics in Indiranagar, RR Nagar, and MG Road, Bengaluru.` },
    { q: `How long does Invisalign treatment take?`, a: `Most Invisalign cases take 12–18 months. Mild corrections may complete in 6–9 months. Your treatment timeline is confirmed after the first consultation.` },
    { q: `Is Invisalign better than metal braces?`, a: `Invisalign is virtually invisible, removable, and more comfortable than traditional metal braces. Our specialists recommend the best option based on your case.` },
    { q: `Is a free Invisalign consultation available?`, a: `Yes. Book a free Invisalign consultation at any Kamakshi Dental clinic. WhatsApp or call ${PHONE}.` },
    { q: `Can adults get Invisalign at Kamakshi Dental?`, a: `Yes. Invisalign is suitable for both adults and teens. Many of our patients are working professionals from across Bengaluru.` },
  ],
  'Root Canal Treatment': [
    { q: `Is root canal treatment painful at Kamakshi Dental?`, a: `No. Using Waterlase laser technology and modern anaesthesia, root canal treatment at Kamakshi Dental is nearly painless. Most patients are surprised by how comfortable the procedure is.` },
    { q: `Is root canal done in a single visit?`, a: `Yes. Most root canal procedures at Kamakshi Dental are completed in a single 60–90 minute appointment using Waterlase laser technology.` },
    { q: `How do I know if I need a root canal?`, a: `Common signs include severe toothache, sensitivity to hot/cold, swollen gums, or a darkening tooth. Book a free consultation at ${PHONE} for a diagnosis.` },
    { q: `What technology does Kamakshi Dental use for root canals?`, a: `We use Waterlase iPlus laser technology — significantly less discomfort, faster healing, and often no drill required.` },
    { q: `How do I book a root canal appointment?`, a: `Call or WhatsApp ${PHONE}. Same-day appointments often available at our Indiranagar, RR Nagar, and MG Road clinics.` },
  ],
  'Teeth Whitening': [
    { q: `How long does teeth whitening take at Kamakshi Dental?`, a: `Professional chairside whitening at Kamakshi Dental takes approximately 60 minutes. Visible results in a single session.` },
    { q: `Is professional teeth whitening safe?`, a: `Yes. Whitening at Kamakshi Dental is performed by qualified dentists using clinically approved bleaching agents. Sensitivity is minimal and temporary.` },
    { q: `How long do whitening results last?`, a: `Results typically last 1–2 years with good oral hygiene. Avoiding tea, coffee, and tobacco helps maintain results longer.` },
    { q: `Is teeth whitening available at all 3 Kamakshi Dental clinics?`, a: `Yes. Professional teeth whitening is available at Indiranagar, RR Nagar, and MG Road clinics. Book via WhatsApp at ${PHONE}.` },
    { q: `How do I book a teeth whitening appointment?`, a: `WhatsApp or call ${PHONE}. Our team will confirm your appointment within 30 minutes.` },
  ],
  'Porcelain Veneers': [
    { q: `Are porcelain veneers done in a single visit at Kamakshi Dental?`, a: `Yes. Using CEREC CAD/CAM technology, Kamakshi Dental designs, mills, and bonds porcelain veneers in a single appointment — no temporary veneers, no second visit.` },
    { q: `How long do porcelain veneers last?`, a: `With proper care, porcelain veneers last 10–15 years. They are stain-resistant and more durable than composite veneers.` },
    { q: `How many teeth can be veneered in one visit?`, a: `Multiple veneers can be designed and placed in a single CEREC session at Kamakshi Dental. Your dentist will advise based on your case.` },
    { q: `Is a veneer consultation free at Kamakshi Dental?`, a: `Yes. Free consultation available at Indiranagar, RR Nagar, and MG Road. Call or WhatsApp ${PHONE}.` },
    { q: `What is the difference between composite and porcelain veneers?`, a: `Porcelain veneers are stronger, more natural-looking, and longer-lasting than composite veneers. Kamakshi Dental uses CEREC milled porcelain for best results.` },
  ],
  'Single Visit Dentistry': [
    { q: `What is single visit dentistry?`, a: `Single visit dentistry uses CEREC CAD/CAM technology to design, mill, and fit crowns, bridges, veneers, and inlays in one 90-minute appointment. Kamakshi Dental is Bengaluru's only clinic with this capability.` },
    { q: `What treatments are completed in a single visit at Kamakshi Dental?`, a: `Crowns, bridges, veneers, inlays, onlays, and root canals are all completed in a single visit using CEREC and Waterlase technology.` },
    { q: `Is CEREC technology available at all Kamakshi Dental clinics?`, a: `Yes. CEREC CAD/CAM is available at Indiranagar, RR Nagar, and MG Road clinics in Bengaluru.` },
    { q: `How long does a single visit crown take?`, a: `A complete CEREC crown — from digital scan to final bonding — takes approximately 90 minutes.` },
    { q: `How do I book a single visit dentistry appointment?`, a: `WhatsApp or call ${PHONE}. Our team confirms your appointment within 30 minutes.` },
  ],
  'Dental Braces': [
    { q: `What types of braces are available at Kamakshi Dental?`, a: `We offer metal braces, ceramic braces, and clear aligners (Invisalign). Our orthodontic specialists recommend the best option based on your teeth and lifestyle.` },
    { q: `Are braces available for adults at Kamakshi Dental?`, a: `Yes. We treat adults, teens, and children across our Indiranagar, RR Nagar, and MG Road clinics in Bengaluru.` },
    { q: `How long does braces treatment take?`, a: `Most braces treatments take 18–24 months. Clear aligner cases may take 12–18 months. Your treatment timeline is confirmed after consultation.` },
    { q: `Is a free braces consultation available?`, a: `Yes. Book a free orthodontic consultation at any Kamakshi Dental clinic. WhatsApp or call ${PHONE}.` },
    { q: `Which is better — braces or Invisalign?`, a: `Both are effective. Braces suit complex corrections; Invisalign is preferred for aesthetics and comfort. Our specialists guide you to the right choice.` },
  ],
  'Smile Correction': [
    { q: `What is smile correction at Kamakshi Dental?`, a: `Smile correction includes braces, Invisalign, veneers, whitening, and gum reshaping — customised to improve the appearance and health of your smile.` },
    { q: `How long does a smile correction take?`, a: `Depends on the treatment. Whitening takes 60 minutes. Veneers are done in a single CEREC visit. Braces and Invisalign take 12–24 months.` },
    { q: `Is smile correction available at all 3 Kamakshi Dental clinics?`, a: `Yes — Indiranagar, RR Nagar, and MG Road all offer complete smile correction services.` },
    { q: `How do I start smile correction treatment?`, a: `Book a free smile consultation. WhatsApp or call ${PHONE} and our team will assess your smile and recommend the best plan.` },
    { q: `Does smile correction require multiple visits?`, a: `Some treatments like veneers and whitening are completed in one visit. Braces and Invisalign require regular follow-up visits every 6–8 weeks.` },
  ],
  'Dental Crown': [
    { q: `Are same-day dental crowns available at Kamakshi Dental?`, a: `Yes. Using CEREC CAD/CAM technology, Kamakshi Dental fits permanent dental crowns in a single 90-minute appointment — no temporary crown required.` },
    { q: `How long does a CEREC crown last?`, a: `CEREC ceramic crowns are highly durable and typically last 15–20 years with proper care.` },
    { q: `Is a dental crown painful?`, a: `No. The procedure is done under local anaesthesia. You will feel no pain during the appointment.` },
    { q: `Is CEREC crown available at all 3 Kamakshi Dental clinics?`, a: `Yes — CEREC crowns are available at Indiranagar, RR Nagar, and MG Road clinics. Book via ${PHONE}.` },
    { q: `How do I know if I need a crown?`, a: `A crown is recommended for cracked, heavily filled, root canal-treated, or broken teeth. Book a free assessment at ${PHONE}.` },
  ],
  'Clear Aligners': [
    { q: `Are clear aligners available in Bangalore at Kamakshi Dental?`, a: `Yes. Kamakshi Dental is a certified clear aligner and Invisalign provider across 3 Bengaluru clinics.` },
    { q: `How do clear aligners work?`, a: `Custom-made transparent trays gently shift teeth over time. You wear each tray for 1–2 weeks, progressing through your treatment plan.` },
    { q: `Are clear aligners removable?`, a: `Yes. Clear aligners are fully removable for eating, drinking, and brushing — a major advantage over fixed braces.` },
    { q: `Can clear aligners fix all alignment issues?`, a: `Clear aligners treat mild to moderate alignment issues effectively. Severe cases may still require braces. Our specialists assess your case for free.` },
    { q: `How do I get clear aligners at Kamakshi Dental?`, a: `Book a free consultation via WhatsApp or call ${PHONE}. We assess your teeth and create a custom aligner plan.` },
  ],
  'CEREC Crowns': [
    { q: `What is CEREC technology?`, a: `CEREC (Chairside Economical Restoration of Esthetic Ceramics) uses digital scanning, CAD design, and in-house milling to create ceramic crowns, bridges, and veneers in a single appointment.` },
    { q: `How long does a CEREC crown appointment take?`, a: `Approximately 90 minutes from digital scan to final bonding. No second appointment needed.` },
    { q: `Is CEREC available at all Kamakshi Dental clinics?`, a: `Yes — CEREC technology is installed at Indiranagar, RR Nagar, and MG Road clinics.` },
    { q: `Are CEREC crowns as strong as lab-made crowns?`, a: `Yes. CEREC ceramic restorations match the strength and aesthetics of traditional lab-made crowns, often with better fit due to digital precision.` },
    { q: `How do I book a CEREC crown appointment?`, a: `WhatsApp or call ${PHONE}. Same-day appointments often available.` },
  ],
  'Preventive Care': [
    { q: `What does preventive dental care include at Kamakshi Dental?`, a: `Routine check-ups, professional scaling and cleaning, digital X-rays, oral cancer screening, and personalised oral health plans.` },
    { q: `How often should I visit the dentist?`, a: `Every 6 months for a check-up and professional cleaning. Early detection prevents costly treatments later.` },
    { q: `Is preventive dental care available at all 3 Kamakshi Dental clinics?`, a: `Yes — preventive care is available at Indiranagar, RR Nagar, and MG Road. Book at ${PHONE}.` },
    { q: `What digital technology does Kamakshi Dental use for check-ups?`, a: `We use Durr Digital X-Ray systems (90% less radiation) and dental loupes for precision examinations.` },
    { q: `How do I book a dental check-up at Kamakshi Dental?`, a: `WhatsApp or call ${PHONE}. Appointments confirmed within 30 minutes.` },
  ],
  'Laser Dentistry': [
    { q: `What is Waterlase laser dentistry?`, a: `Waterlase iPlus combines water, air, and laser energy to perform cavity preparation, root canals, and gum treatments with minimal discomfort — often without anaesthesia.` },
    { q: `Is laser dentistry painful?`, a: `Laser dentistry at Kamakshi Dental is significantly less painful than traditional methods. Many patients require no anaesthesia at all.` },
    { q: `Is Waterlase available at all Kamakshi Dental clinics?`, a: `Yes — Waterlase laser technology is available at Indiranagar, RR Nagar, and MG Road clinics.` },
    { q: `What treatments can laser dentistry replace?`, a: `Root canals, cavity preparation, gum reshaping, soft tissue surgery — all can be performed with Waterlase instead of traditional drills and blades.` },
    { q: `How do I book a laser dentistry appointment?`, a: `WhatsApp or call ${PHONE}. Our team will advise if laser dentistry suits your treatment.` },
  ],
  'Painless Dentistry': [
    { q: `What makes Kamakshi Dental's treatments painless?`, a: `Combination of Waterlase laser (no drill), modern anaesthesia, Biolase soft tissue laser, and CEREC same-day restorations minimise discomfort at every step.` },
    { q: `Is root canal treatment painless at Kamakshi Dental?`, a: `Yes. With Waterlase laser and modern anaesthesia, most patients experience no pain during or after root canal treatment.` },
    { q: `Is Kamakshi Dental good for dental anxiety patients?`, a: `Yes. Our calm environment, laser-first approach, and experienced team make treatment comfortable even for anxious patients.` },
    { q: `What technology ensures pain-free treatment?`, a: `Waterlase iPlus laser, Biolase soft tissue laser, precision loupes, and CEREC same-day technology all contribute to a painless experience.` },
    { q: `How do I book a painless dentistry appointment?`, a: `WhatsApp or call ${PHONE}. Our team will explain your treatment options before your appointment.` },
  ],
  'Gum Treatment': [
    { q: `Do you treat swollen or bleeding gums at Kamakshi Dental?`, a: `Yes. We treat gum swelling, bleeding gums, infection, and early to advanced gum disease across all Kamakshi Dental clinics in Bengaluru.` },
    { q: `Who handles gum treatment at Kamakshi Dental?`, a: `Dr. Akarsh Bilimagga is an MDS Periodontics specialist and oversees advanced gum care, periodontal cleaning, and surgical gum treatment plans.` },
    { q: `Can gum disease be treated without surgery?`, a: `Early gum disease is often treated with deep cleaning, laser support, and oral hygiene guidance. Advanced cases may require periodontal procedures.` },
    { q: `Is gum treatment painful?`, a: `Most gum treatments are comfortable with modern anaesthesia and laser-assisted care. Our team explains the procedure before starting treatment.` },
    { q: `How do I book a gum treatment consultation?`, a: `Call or WhatsApp ${PHONE}. We will guide you to the nearest Kamakshi Dental clinic for gum assessment.` },
  ],
  'Crooked Teeth Treatment': [
    { q: `What treatments are available for crooked teeth?`, a: `Kamakshi Dental offers braces, Invisalign, and clear aligners depending on the severity of crowding, spacing, and bite issues.` },
    { q: `Can adults fix crooked teeth?`, a: `Yes. Many adults choose Invisalign or ceramic braces to correct crooked teeth discreetly and comfortably.` },
    { q: `How long does crooked teeth treatment take?`, a: `Treatment time depends on case complexity, but most alignment cases are completed in 6 to 24 months.` },
    { q: `Is Invisalign better than braces for crooked teeth?`, a: `Invisalign is popular for mild to moderate corrections, while braces are often better for more complex tooth movement. Our specialists recommend the right option after consultation.` },
    { q: `How do I start treatment for crooked teeth?`, a: `Call or WhatsApp ${PHONE} to book a consultation at Indiranagar, RR Nagar, or MG Road.` },
  ],
  'Bad Breath Treatment': [
    { q: `Can bad breath be treated by a dentist?`, a: `Yes. Persistent bad breath is often linked to gum disease, decay, trapped food, dry mouth, or oral infection, all of which a dentist can diagnose and treat.` },
    { q: `What causes bad breath even after brushing?`, a: `Common causes include plaque buildup, gum infection, cavities, tongue coating, dry mouth, and impacted food between teeth or under gums.` },
    { q: `Will professional cleaning help bad breath?`, a: `Yes. Professional cleaning and treatment of the underlying cause often improve bad breath significantly.` },
    { q: `Do you check for gum disease if I have bad breath?`, a: `Yes. Kamakshi Dental evaluates gums, teeth, tongue coating, and oral hygiene habits to identify the main cause of persistent bad breath.` },
    { q: `How do I book a bad breath consultation?`, a: `Call or WhatsApp ${PHONE} and our team will schedule an oral health evaluation at the nearest clinic.` },
  ],
};

// ============================================================
// HTML TEMPLATE — Zomato/Pepperfry style micro-page
// ============================================================
function generatePage(page) {
  const faqList = faqs[page.faqService || page.service] || faqs['General Dentistry'];
  const faqSchema = faqList.map(f => `{"@type":"Question","name":"${f.q}","acceptedAnswer":{"@type":"Answer","text":"${f.a}"}}`).join(',');
  const faqHTML = faqList.map(f => `
    <div class="faq-item" onclick="this.classList.toggle('open')">
      <div class="fq">${f.q}<span class="fi">+</span></div>
      <div class="fa">${f.a}</div>
    </div>`).join('');

  const isMultiLocation = page.location === 'Bangalore';
  const addressSection = isMultiLocation ? `
    <div class="branches">
      <div class="branch">
        <div class="branch-copy">
          <div class="bl">Indiranagar</div>
          <div class="ba">No 338, 4th Main Road, New Tippasandra, Bengaluru 560075</div>
        </div>
        <a href="https://wa.me/${WA_NUMBER}?text=Hello%20Kamakshi%20Dental%2C%20I%20want%20to%20book%20${encodeURIComponent(page.service)}%20at%20Indiranagar" class="bbook">Book Indiranagar</a>
      </div>
      <div class="branch">
        <div class="branch-copy">
          <div class="bl">RR Nagar</div>
          <div class="ba">BEML Layout, Rajarajeshwari Nagar, Bengaluru 560098</div>
        </div>
        <a href="https://wa.me/${WA_NUMBER}?text=Hello%20Kamakshi%20Dental%2C%20I%20want%20to%20book%20${encodeURIComponent(page.service)}%20at%20RR%20Nagar" class="bbook">Book RR Nagar</a>
      </div>
      <div class="branch">
        <div class="branch-copy">
          <div class="bl">MG Road</div>
          <div class="ba">No 35, United Mansion, MG Road, Ashok Nagar, Bengaluru 560001</div>
        </div>
        <a href="https://wa.me/${WA_NUMBER}?text=Hello%20Kamakshi%20Dental%2C%20I%20want%20to%20book%20${encodeURIComponent(page.service)}%20at%20MG%20Road" class="bbook">Book MG Road</a>
      </div>
    </div>` : `
    <div class="addr-box">
      <div class="addr-row"><span class="al">Location</span><span class="av">Kamakshi Dental — ${page.location}</span></div>
      <div class="addr-row"><span class="al">Address</span><span class="av">${page.area}, Bengaluru${page.pin ? ', Karnataka ' + page.pin : ''}</span></div>
      <div class="addr-row"><span class="al">Landmarks</span><span class="av">${page.landmarks}</span></div>
      <div class="addr-row"><span class="al">Phone</span><span class="av">${page.phone}</span></div>
      <div class="addr-row"><span class="al">Universal</span><span class="av">${PHONE}</span></div>
      <div class="addr-row"><span class="al">Timings</span><span class="av">Monday – Saturday · 9:00 AM – 8:00 PM</span></div>
    </div>`;

  const schemaType = page.location === 'Bangalore' ? 'MedicalClinic' : 'Dentist';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${page.title} | Kamakshi Dental</title>
<meta name="description" content="${page.title} at Kamakshi Dental. Expert care by Dr. Akarsh Bilimagga. Single-visit dentistry using CEREC technology. 4.9 Google Rating. Book on WhatsApp: ${PHONE}">
<meta name="keywords" content="${page.title.toLowerCase()}, kamakshi dental, ${page.service.toLowerCase()} bangalore, best dentist bangalore, single visit dentistry bangalore">
<link rel="canonical" href="${DOMAIN}/${page.slug}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<script>
window.KAMAKSHI_TRACKING_CONTEXT = {
  pageSlug: '${page.slug}',
  pageTitle: ${JSON.stringify(page.title)},
  location: ${JSON.stringify(page.location)},
  service: ${JSON.stringify(page.service)}
};
</script>
<script src="analytics-config.js"></script>
<script defer src="analytics.js"></script>
<script type="application/ld+json">
[{"@context":"https://schema.org","@type":"${schemaType}","name":"Kamakshi Dental","url":"${DOMAIN}/${page.slug}","telephone":"${PHONE}","email":"${EMAIL}","openingHours":"Mo-Sa 09:00-20:00","priceRange":"Contact for pricing","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"500"}},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${faqSchema}]}]
</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
:root{--navy:#04111f;--teal:#0b7a6a;--teal2:#0d9e8a;--lime:#d4f53c;--white:#fff;--gray:#f5f7f2;--text:#1a2332;--muted:#5a6a7a;--border:#dde3dd;}
body{font-family:'Poppins',sans-serif;color:var(--text);background:var(--white);}
a{text-decoration:none;}
nav{background:var(--navy);padding:0 5%;}
.nav-in{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:20px;min-height:72px;padding:12px 0;}
.logo{display:flex;align-items:center;min-width:0;}
.logo img{display:block;width:100%;height:auto;}
.nav-logo{max-width:280px;flex:1 1 auto;}
.footer-logo{max-width:220px;}
.nav-cta{background:var(--lime);color:var(--navy);padding:10px 20px;border-radius:50px;font-weight:600;font-size:13px;}
.hero{background:var(--navy);padding:60px 5% 50px;position:relative;overflow:hidden;}
.hero::after{content:'';position:absolute;top:-100px;right:-100px;width:400px;height:400px;border-radius:50%;background:rgba(11,122,106,0.1);}
.hero-in{max-width:1100px;margin:0 auto;position:relative;z-index:1;}
.badge{display:inline-block;background:rgba(212,245,60,0.15);border:1px solid rgba(212,245,60,0.3);color:var(--lime);font-size:11px;font-weight:600;padding:6px 14px;border-radius:50px;margin-bottom:20px;letter-spacing:0.08em;text-transform:uppercase;}
h1{font-size:42px;font-weight:800;color:white;line-height:1.15;margin-bottom:16px;}
h1 span{color:var(--lime);}
.hero-sub{font-size:16px;color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:32px;max-width:600px;}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap;}
.btn-wa{background:#25D366;color:white;padding:14px 28px;border-radius:50px;font-weight:600;font-size:15px;display:inline-flex;align-items:center;gap:8px;}
.btn-wa svg{width:20px;height:20px;fill:white;}
.btn-call{border:1px solid rgba(255,255,255,0.2);color:white;padding:14px 28px;border-radius:50px;font-size:15px;}
.trust{display:flex;gap:32px;margin-top:40px;padding-top:40px;border-top:1px solid rgba(255,255,255,0.08);flex-wrap:wrap;}
.tn{font-size:28px;font-weight:800;color:var(--lime);}
.tl{font-size:12px;color:rgba(255,255,255,0.4);margin-top:2px;}
.main{max-width:1100px;margin:0 auto;padding:60px 5%;}
.grid2{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(340px,1fr);align-items:start;gap:40px;margin-bottom:60px;}
.section-tag{font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--teal);margin-bottom:10px;display:flex;align-items:center;gap:8px;}
.section-tag::before{content:'';display:block;width:20px;height:1px;background:var(--teal);}
h2{font-size:32px;font-weight:800;color:var(--navy);line-height:1.2;margin-bottom:14px;}
h2 span{color:var(--teal);}
.desc{font-size:15px;color:var(--muted);line-height:1.8;margin-bottom:20px;}
.feat-list{list-style:none;display:flex;flex-direction:column;gap:12px;margin-top:20px;}
.feat-list li{display:flex;align-items:flex-start;gap:12px;font-size:14px;color:var(--muted);line-height:1.6;}
.feat-list li::before{content:'';display:block;width:6px;height:6px;background:var(--teal);border-radius:50%;flex-shrink:0;margin-top:7px;}
.addr-box{background:var(--navy);border-radius:16px;padding:24px;}
.addr-row{display:flex;gap:12px;margin-bottom:12px;font-size:13px;}
.addr-row:last-child{margin-bottom:0;}
.al{color:rgba(255,255,255,0.4);width:80px;flex-shrink:0;font-weight:500;}
.av{color:white;line-height:1.5;}
.book-card{background:var(--lime);border-radius:16px;padding:24px;margin-top:0;}
.book-title{font-size:16px;font-weight:700;color:var(--navy);margin-bottom:8px;}
.book-sub{font-size:13px;color:rgba(4,17,31,0.6);margin-bottom:16px;line-height:1.5;}
.book-btn{display:block;background:var(--navy);color:white;text-align:center;padding:14px;border-radius:50px;font-weight:600;font-size:14px;font-family:'Poppins',sans-serif;}
.book-num{font-size:18px;font-weight:800;color:var(--navy);margin-bottom:4px;}
.branches{display:grid;grid-template-columns:1fr;gap:14px;margin-bottom:16px;}
.branch{background:var(--gray);border:1px solid var(--border);border-radius:14px;padding:18px;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:16px;}
.branch-copy{min-width:0;}
.bl{font-size:15px;font-weight:700;color:var(--navy);margin-bottom:6px;}
.ba{font-size:13px;color:var(--muted);line-height:1.55;margin-bottom:0;}
.bbook{display:inline-flex;align-items:center;justify-content:center;align-self:stretch;min-width:138px;background:var(--teal);color:white;text-align:center;padding:12px 18px;border-radius:999px;font-size:13px;font-weight:600;line-height:1.35;}
h3{font-size:24px;font-weight:700;color:var(--navy);margin-bottom:24px;}
.faq-item{border:1px solid var(--border);border-radius:12px;margin-bottom:10px;overflow:hidden;}
.fq{padding:16px 18px;font-size:15px;font-weight:500;color:var(--navy);cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;}
.fi{font-size:20px;color:var(--teal);flex-shrink:0;transition:transform 0.2s;}
.faq-item.open .fi{transform:rotate(45deg);}
.fa{max-height:0;overflow:hidden;font-size:14px;color:var(--muted);line-height:1.7;padding:0 18px;transition:all 0.3s;}
.faq-item.open .fa{max-height:200px;padding:0 18px 16px;}
.related{background:var(--gray);padding:60px 5%;}
.rel-in{max-width:1100px;margin:0 auto;}
.rel-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:24px;}
.rel-card{background:white;border:1px solid var(--border);border-radius:12px;padding:16px;font-size:13px;color:var(--navy);font-weight:500;transition:all 0.2s;}
.rel-card:hover{border-color:var(--teal);color:var(--teal);}
.wa-float{position:fixed;bottom:24px;right:24px;z-index:9999;}
.wa-float a{display:flex;align-items:center;gap:8px;background:#25D366;color:white;padding:12px 18px;border-radius:50px;font-weight:600;font-size:13px;font-family:'Poppins',sans-serif;box-shadow:0 4px 20px rgba(37,211,102,0.4);}
.wa-float svg{width:20px;height:20px;fill:white;}
footer{background:#020c16;padding:40px 5% 24px;}
.foot-in{max-width:1100px;margin:0 auto;}
.foot-top{display:flex;justify-content:space-between;align-items:start;flex-wrap:wrap;gap:24px;margin-bottom:32px;}
.foot-links{display:flex;gap:24px;flex-wrap:wrap;}
.foot-links a{font-size:13px;color:rgba(255,255,255,0.4);}
.foot-links a:hover{color:var(--lime);}
.foot-bot{border-top:1px solid rgba(255,255,255,0.06);padding-top:20px;font-size:12px;color:rgba(255,255,255,0.2);}
.foot-credit{margin-top:10px;font-size:12px;color:rgba(255,255,255,0.32);}
.foot-credit a{color:var(--lime);font-weight:600;}
.foot-credit a:hover{color:white;}
@media(max-width:768px){
  h1{font-size:28px;}
  .grid2,.rel-grid{grid-template-columns:1fr;}
  .trust{gap:20px;}
  .branch{grid-template-columns:1fr;}
  .bbook{width:100%;min-width:0;}
  .nav-in{align-items:flex-start;flex-direction:column;}
}
</style>
</head>
<body>
<nav>
  <div class="nav-in">
    <div class="logo">
      <img src="kamakshi-dental-logo.png" alt="Kamakshi Dental - Single Visit Dentistry" class="nav-logo">
    </div>
    <a href="https://wa.me/${WA_NUMBER}?text=Hello%20Kamakshi%20Dental%2C%20I%20want%20to%20book%20${encodeURIComponent(page.service)}" target="_blank" class="nav-cta">Book on WhatsApp</a>
  </div>
</nav>

<div class="hero">
  <div class="hero-in">
    <div class="badge">4.9 Google Rating · TOI Top Clinic 2021</div>
    <h1>${page.title.replace(page.location, `<span>${page.location}</span>`)}</h1>
    <p class="hero-sub">Expert ${page.service} at Kamakshi Dental — Bengaluru's only single-visit dentistry clinic. Led by Dr. Akarsh Bilimagga, MDS Specialist. Available at ${page.location === 'Bangalore' ? 'Indiranagar, RR Nagar, and MG Road' : page.location + ' (' + page.area + ')'}.</p>
    <div class="hero-btns">
      <a href="https://wa.me/${WA_NUMBER}?text=Hello%20Kamakshi%20Dental%2C%20I%20want%20to%20book%20${encodeURIComponent(page.service)}%20at%20${encodeURIComponent(page.location)}" target="_blank" class="btn-wa">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.14 1.534 5.875L.057 23.885a.5.5 0 0 0 .606.65l6.207-1.625A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.858 9.858 0 0 1-5.031-1.381l-.36-.214-3.733.978.997-3.645-.235-.374A9.847 9.847 0 0 1 2.106 12C2.106 6.532 6.532 2.106 12 2.106S21.894 6.532 21.894 12 17.468 21.894 12 21.894z"/></svg>
        Book on WhatsApp
      </a>
      <a href="tel:${PHONE}" class="btn-call">Call ${PHONE}</a>
    </div>
    <div class="trust">
      <div><div class="tn">4.9</div><div class="tl">Google Rating</div></div>
      <div><div class="tn">16+</div><div class="tl">Years in Bengaluru</div></div>
      <div><div class="tn">3</div><div class="tl">Clinic Locations</div></div>
      <div><div class="tn">10K+</div><div class="tl">Patients Treated</div></div>
    </div>
  </div>
</div>

<div class="main">
  <div class="grid2">
    <div>
      <div class="section-tag">${page.service} in ${page.location}</div>
      <h2>${page.title} at <span>Kamakshi Dental</span></h2>
      <p class="desc">Kamakshi Dental offers expert ${page.service} in ${page.location}, Bengaluru. Our clinic uses the latest technology including CEREC CAD/CAM, Waterlase laser, and Biolase soft tissue laser to deliver painless, precise, and efficient dental treatments.</p>
      <p class="desc">Led by Dr. Akarsh Bilimagga — MDS Periodontics and Oral Implantology specialist — with 8+ years of experience and over 10,000 successful dental procedures across Bengaluru.</p>
      <ul class="feat-list">
        <li>Bengaluru's only CEREC single-visit dentistry clinic</li>
        <li>Painless procedures using Waterlase laser technology</li>
        <li>4.9 star Google rating from 500+ verified patients</li>
        <li>Times of India Top Dental Clinic — Bengaluru 2021</li>
        <li>International patient referrals for implants and Invisalign</li>
        <li>Open Monday to Saturday, 9:00 AM to 8:00 PM</li>
      </ul>
    </div>
    <div>
      ${addressSection}
      <div class="book-card">
        <div class="book-num">${PHONE}</div>
        <div class="book-title">Book ${page.service} Appointment</div>
        <div class="book-sub">WhatsApp us and our team confirms your appointment within 30 minutes.</div>
        <a href="https://wa.me/${WA_NUMBER}?text=Hello%20Kamakshi%20Dental%2C%20I%20want%20to%20book%20${encodeURIComponent(page.service)}%20at%20${encodeURIComponent(page.location)}" target="_blank" class="book-btn">Book on WhatsApp Now</a>
      </div>
    </div>
  </div>

  <h3>Frequently Asked Questions — ${page.title}</h3>
  ${faqHTML}
</div>

<div class="related">
  <div class="rel-in">
    <div class="section-tag">Related Services</div>
    <h3>Explore More at Kamakshi Dental</h3>
    <div class="rel-grid">
      <a href="dental-implants-bangalore.html" class="rel-card">Dental Implants Bangalore</a>
      <a href="invisalign-bangalore.html" class="rel-card">Invisalign Bangalore</a>
      <a href="root-canal-bangalore.html" class="rel-card">Root Canal Bangalore</a>
      <a href="teeth-whitening-bangalore.html" class="rel-card">Teeth Whitening Bangalore</a>
      <a href="dental-clinic-indiranagar.html" class="rel-card">Dental Clinic Indiranagar</a>
      <a href="dental-clinic-rr-nagar.html" class="rel-card">Dental Clinic RR Nagar</a>
      <a href="dental-clinic-mg-road.html" class="rel-card">Dental Clinic MG Road</a>
      <a href="index.html" class="rel-card">Kamakshi Dental Home</a>
    </div>
  </div>
</div>

<div class="wa-float">
  <a href="https://wa.me/${WA_NUMBER}?text=Hello%20Kamakshi%20Dental%2C%20I%20want%20to%20book%20an%20appointment." target="_blank">
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.14 1.534 5.875L.057 23.885a.5.5 0 0 0 .606.65l6.207-1.625A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.858 9.858 0 0 1-5.031-1.381l-.36-.214-3.733.978.997-3.645-.235-.374A9.847 9.847 0 0 1 2.106 12C2.106 6.532 6.532 2.106 12 2.106S21.894 6.532 21.894 12 17.468 21.894 12 21.894z"/></svg>
    Book Now
  </a>
</div>

<footer>
  <div class="foot-in">
    <div class="foot-top">
      <div class="logo">
        <img src="kamakshi-dental-logo.png" alt="Kamakshi Dental - Single Visit Dentistry" class="footer-logo">
      </div>
      <div class="foot-links">
        <a href="index.html">Home</a>
        <a href="dental-clinic-indiranagar.html">Indiranagar</a>
        <a href="dental-clinic-rr-nagar.html">RR Nagar</a>
        <a href="dental-clinic-mg-road.html">MG Road</a>
        <a href="dental-implants-bangalore.html">Dental Implants</a>
        <a href="invisalign-bangalore.html">Invisalign</a>
      </div>
    </div>
    <div class="foot-bot">© 2026 Kamakshi Dental · ${page.title} · ${PHONE} · All Rights Reserved</div>
    <div class="foot-credit">Developed by <a href="https://telzonmarketing.in" target="_blank" rel="noopener noreferrer">Telzon Marketing</a> · © 2026</div>
  </div>
</footer>
</body>
</html>`;
}

// ============================================================
// GENERATE ALL PAGES
// ============================================================
const outputDir = __dirname;

pages.forEach(page => {
  const html = generatePage(page);
  fs.writeFileSync(path.join(outputDir, `${page.slug}.html`), html, 'utf-8');
});

// Generate sitemap with all pages
const today = new Date().toISOString().split('T')[0];
const sitemapUrls = [
  `<url><loc>${DOMAIN}/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>`,
  ...pages.map(p => `<url><loc>${DOMAIN}/${p.slug}</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>`)
].join('\n  ');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapUrls}
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap, 'utf-8');

// Generate URL list for indexing script
const urlList = pages.map(p => `'${DOMAIN}/${p.slug}'`).join(',\n  ');
fs.writeFileSync(path.join(__dirname, 'url-list.js'), `module.exports = [\n  '${DOMAIN}/',\n  ${urlList}\n];\n`);

console.log(`Generated ${pages.length} pages`);
console.log(`Slugs: ${pages.map(p => p.slug).join(', ')}`);
