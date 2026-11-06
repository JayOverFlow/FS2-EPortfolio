window.PORTFOLIO = {
  teacher: {
    name: "John Rex B. Duran",
    role: "Pre-service teacher",
    program: "BTVTED, Major in Computer Programming",
    institution: "Technological University of the Philippines, Taguig",
    school: "President Diosdado Macapagal High School",
    division: "Schools Division of Taguig City and Pateros",
    placement: "Grade 7 TLE (ICT), Sections James, Genesis, Isaiah",
    period: "First trimester, S.Y. 2026–2027",
    email: "johnrex.duran@tup.edu.ph",
    github: "https://github.com/JayOverFlow",
    repo: "FS1-EPortfolio",
    ct: "Ferdinand S. Baltazar"
  },

  ts: [
    { code: "TS1",  label: "Data bank",     target: "section-viii" },
    { code: "TS2",  label: "Annotated DLL", target: "section-v" },
    { code: "TS3",  label: "Alignment",     target: "section-v" },
    { code: "TS4",  label: "Management",    target: "section-v" },
    { code: "TS5",  label: "DLL",           target: "section-v" },
    { code: "TS6",  label: "Plans + IM",    target: "section-v" },
    { code: "TS7",  label: "Assessment",    target: "section-v" },
    { code: "TS8",  label: "Research",      target: "section-viii" },
    { code: "TS9",  label: "PD",            target: "section-vi" },
    { code: "TS10", label: "LAC",           target: "section-vi" },
    { code: "TS11", label: "Philosophy",    target: "section-ix" },
    { code: "TS12", label: "Microteaching", target: "section-vii" },
    { code: "TS13", label: "CT evaluation", target: "section-x" }
  ],

  sections: [
    {
      roman: "I",
      title: "Table of Contents",
      note: "Ten sections. Twenty-one documents.",
      type: "toc"
    },
    {
      roman: "II",
      title: "Introduction",
      note: "Context and purpose.",
      type: "prose",
      intro: [
        "I am a pre-service teacher in the BTVTED program at the Technological University of the Philippines, Taguig, majoring in Computer Programming. For the first trimester of S.Y. 2026–2027 I taught Grade 7 TLE at President Diosdado Macapagal High School, handling the ICT strand across Sections James, Genesis, and Isaiah.",
        "Each document is filed under the checklist section it answers, and most carry the practicum indicator (TS) they satisfy. A panelist can start from TS6 and land on the lesson plans and materials, or start from the table of contents and read the term in order.",
        "Documents open in a panel on this page. Nothing downloads until you ask it to."
      ],
      meta: [
        ["Program", "BTVTED, Major in Computer Programming"],
        ["Placement", "Grade 7 TLE (ICT), Sections James, Genesis, Isaiah"],
        ["Partner school", "President Diosdado Macapagal High School"],
        ["Period", "First trimester, S.Y. 2026–2027"],
        ["Cooperating teacher", "Ferdinand S. Baltazar"],
        ["Institution", "Technological University of the Philippines, Taguig"]
      ]
    },
    {
      roman: "III",
      title: "About the Teacher (Curriculum Vitae)",
      note: "Education, placement, skills.",
      type: "cv",
      intro: [
        "My background is in computer programming, and my practice teaching put that background in front of Grade 7 learners for a trimester. The summary below is the short version; the PDF is the submitted copy."
      ],
      cv: {
        education: {
          title: "BTVTED, Major in Computer Programming",
          lines: ["Technological University of the Philippines, Taguig", "In progress"]
        },
        practice: {
          title: "Practice Teaching, Grade 7 TLE (ICT)",
          lines: ["President Diosdado Macapagal High School", "First trimester, S.Y. 2026–2027", "Cooperating Teacher: Ferdinand S. Baltazar"]
        },
        skills: [
          "Computer programming fundamentals",
          "ICT integration in TLE",
          "Lesson and assessment design",
          "Classroom management",
          "Technical writing"
        ],
        references: [
          { name: "Ferdinand S. Baltazar", role: "Cooperating Teacher, President Diosdado Macapagal High School" }
        ]
      },
      docs: [
        {
          slug: "curriculum-vitae",
          tag: "CV",
          title: "Curriculum Vitae",
          desc: "One page, with education, practice teaching placement, skills, and references.",
          type: "PDF"
        }
      ]
    },
    {
      roman: "IV",
      title: "Learning Environment (Partner School)",
      note: "Partner school profile.",
      type: "docs",
      intro: [
        "President Diosdado Macapagal High School is a public secondary school in Taguig City, under the Schools Division of Taguig City and Pateros. I completed my practice teaching there in the first trimester of S.Y. 2026–2027."
      ],
      figure: {
        src: "assets/school-building.svg",
        alt: "Placeholder illustration of the President Diosdado Macapagal High School campus",
        caption: "Campus photograph pending. President Diosdado Macapagal High School."
      },
      docs: [
        {
          slug: "school-vision-mission",
          title: "Vision and Mission",
          desc: "The school's vision and mission statements, as posted and used in orientation.",
          type: "Document"
        },
        {
          slug: "school-history",
          title: "Short History",
          desc: "A brief account of the school's founding and growth.",
          type: "Document"
        },
        {
          slug: "school-grounds",
          title: "School Grounds and Building",
          desc: "Photographs of the campus, the classrooms, and the TLE workspaces I used.",
          type: "Image set"
        }
      ]
    },
    {
      roman: "V",
      title: "Curriculum and Planning",
      note: "The teaching load, documented.",
      type: "docs",
      intro: [
        "The planning documents follow the order of the teaching cycle: the annotated DLL, competencies, management, daily logs, lesson plans, materials, and assessment. The demonstration lesson converts between binary and decimal number systems, with the place-value cards and worksheets used in class."
      ],
      docs: [
        {
          slug: "annotated-dll",
          ts: "TS2",
          title: "Annotated DLL",
          desc: "Week 4 DLL on binary and decimal conversion, with cooperating teacher annotations.",
          type: "PDF"
        },
        {
          slug: "competencies-alignment",
          ts: "TS3",
          title: "Competencies Alignment",
          desc: "MATATAG competencies mapped to lesson objectives and assessment items.",
          type: "PDF"
        },
        {
          slug: "classroom-management-plan",
          ts: "TS4",
          title: "Classroom Management Plan",
          desc: "Rules, routines, seating, and the response ladder for Grade 7 TLE.",
          type: "PDF"
        },
        {
          slug: "daily-lesson-log",
          ts: "TS5",
          title: "Daily Lesson Log",
          desc: "The complete DLL set for the first trimester.",
          type: "PDF"
        },
        {
          slug: "lesson-plans",
          ts: "TS6",
          title: "Lesson Plans",
          desc: "Detailed plans for the observed lessons, including the binary conversion demonstration.",
          type: "PDF"
        },
        {
          slug: "instructional-materials",
          ts: "TS6",
          title: "Instructional Materials",
          desc: "Slides, worksheets, and the binary place-value cards used in class.",
          type: "Image set"
        },
        {
          slug: "assessment-tools",
          ts: "TS7",
          title: "Assessment Tools and Evaluation",
          desc: "Quizzes, performance rubrics, and the item analysis for the unit test.",
          type: "PDF"
        }
      ]
    },
    {
      roman: "VI",
      title: "Professional Development Certificates",
      note: "Certificates and participation.",
      type: "docs",
      intro: [
        "Certificates and participation records. The first group comes from professional development providers; the second from LAC sessions and school activities."
      ],
      docs: [
        {
          slug: "pd-certificates",
          ts: "TS9",
          group: "Professional development organizations",
          title: "Professional Development Certificates",
          desc: "Certificates from seminars and training organized by professional development providers.",
          type: "Image set"
        },
        {
          slug: "lac-participation",
          ts: "TS10",
          group: "LAC sessions and school activities",
          title: "LAC Session and School Activity Participation",
          desc: "Attendance records and reflection notes from Learning Action Cell sessions and school activities.",
          type: "Image set"
        }
      ]
    },
    {
      roman: "VII",
      title: "Microteaching",
      note: "Recorded teaching and feedback.",
      type: "docs",
      intro: [
        "I recorded a demonstration lesson and sat for an evaluation. The form and the lesson documentation are filed here."
      ],
      docs: [
        {
          slug: "microteaching-evaluation",
          ts: "TS12",
          title: "Evaluation Form",
          desc: "The observer's completed evaluation form, with ratings and written comments.",
          type: "PDF"
        },
        {
          slug: "microteaching-dlp",
          ts: "TS12",
          title: "DLP and Documentation",
          desc: "The demonstration lesson plan, plus photographs and the recording log.",
          type: "Image set"
        }
      ]
    },
    {
      roman: "VIII",
      title: "Classroom-Based Action Research Proposal",
      note: "Research from the classroom.",
      type: "docs",
      intro: [
        "The action research proposal follows the DepEd classroom-based action research format. The data bank holds the instruments and raw responses, the manuscript holds the write-up, and the rubric holds the panel's score and comments."
      ],
      docs: [
        {
          slug: "action-research-data-bank",
          ts: "TS1",
          title: "Action Research Data Bank",
          desc: "Instruments, raw responses, and the consolidated data sheet.",
          type: "PDF"
        },
        {
          slug: "cbar-manuscript",
          ts: "TS8",
          title: "CBAR Manuscript",
          desc: "The complete classroom-based action research proposal, from context to appendices.",
          type: "PDF"
        },
        {
          slug: "cbar-rubric",
          title: "Rubric With Panel's Comments and Score",
          desc: "The scored rubric, including the panel's written comments.",
          type: "PDF"
        }
      ]
    },
    {
      roman: "IX",
      title: "Teaching Philosophy",
      note: "What I believe teaching is for.",
      type: "philosophy",
      quote: "I want learners to leave my class able to build something that works and explain why it works. A learner who can debug a conversion error has learned more than one who can recite the steps.",
      docs: [
        {
          slug: "teaching-philosophy",
          ts: "TS11",
          title: "Teaching Philosophy",
          desc: "The full statement, signed and dated.",
          type: "PDF"
        }
      ]
    },
    {
      roman: "X",
      title: "Appendices",
      note: "Records and attachments.",
      type: "docs",
      intro: [
        "Records and attachments. The cooperating teacher's evaluation goes to the panel in a sealed envelope and is not published here. The daily time record is filed below."
      ],
      docs: [
        {
          slug: "ct-evaluation",
          ts: "TS13",
          group: "Submitted separately",
          title: "Evaluation from CT",
          desc: "Submitted separately to the panel in a sealed envelope.",
          type: "Sealed",
          separate: true
        },
        {
          slug: "daily-time-record",
          group: "Filed with this portfolio",
          title: "Daily Time Record",
          desc: "The DTR for the practice teaching period, signed by the cooperating teacher.",
          type: "PDF"
        }
      ]
    }
  ]
};
