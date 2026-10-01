/**
 * Constants
 */

export const ACTIVITY_TYPES = [
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'competition', label: 'Competition' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'certification', label: 'Certification' },
  { value: 'project', label: 'Project' },
  { value: 'internship', label: 'Internship' },
  { value: 'publication', label: 'Publication' },
  { value: 'other', label: 'Other' },
];

export const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

export const POINTS_SCALE = {
  hackathon: 100,
  competition: 75,
  workshop: 25,
  certification: 50,
  project: 100,
  internship: 150,
  publication: 200,
  other: 10,
};
