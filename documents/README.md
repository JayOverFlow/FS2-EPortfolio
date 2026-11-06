# Documents

Drop final files here. The site checks for each expected filename when it loads.

## How it works

Each document in `js/data.js` has a `slug`. If a PDF sits at `documents/<slug>.pdf`, the row switches from **Pending** to **Ready** and the viewer renders the PDF.

Image sets show a folder slot, but a single PDF at `documents/<slug>.pdf` is also accepted. For multiple images, add the paths to the document's `files` array instead:

```js
{
  slug: "instructional-materials",
  files: [
    "documents/instructional-materials/slide-01.jpg",
    "documents/instructional-materials/slide-02.jpg"
  ]
}
```

## Expected filenames

| Section | Document | File |
| --- | --- | --- |
| III | Curriculum Vitae | `curriculum-vitae.pdf` |
| IV | Vision and Mission | `school-vision-mission.pdf` |
| IV | Short History | `school-history.pdf` |
| IV | School Grounds and Building | `school-grounds.pdf` or `files: []` |
| V | Annotated DLL | `annotated-dll.pdf` |
| V | Competencies Alignment | `competencies-alignment.pdf` |
| V | Classroom Management Plan | `classroom-management-plan.pdf` |
| V | Daily Lesson Log | `daily-lesson-log.pdf` |
| V | Lesson Plans | `lesson-plans.pdf` |
| V | Instructional Materials | `instructional-materials.pdf` or `files: []` |
| V | Assessment Tools and Evaluation | `assessment-tools.pdf` |
| VI | Professional Development Certificates | `pd-certificates.pdf` or `files: []` |
| VI | LAC Session and School Activity Participation | `lac-participation.pdf` or `files: []` |
| VII | Evaluation Form | `microteaching-evaluation.pdf` |
| VII | DLP and Documentation | `microteaching-dlp.pdf` or `files: []` |
| VIII | Action Research Data Bank | `action-research-data-bank.pdf` |
| VIII | CBAR Manuscript | `cbar-manuscript.pdf` |
| VIII | Rubric With Panel's Comments and Score | `cbar-rubric.pdf` |
| IX | Teaching Philosophy | `teaching-philosophy.pdf` |
| X | Daily Time Record | `daily-time-record.pdf` |

The cooperating teacher's evaluation (`ct-evaluation`) stays sealed. Do not upload it.
