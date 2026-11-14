window.PORTFOLIO = {
  teacher: {
    name: "John Rex B. Duran",
    role: "Pre-service teacher",
    program: "BTVTED, Major in Computer Programming",
    institution: "Technological University of the Philippines - Taguig",
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
      note: "Ten sections. Nineteen documents.",
      type: "toc"
    },
    {
      roman: "II",
      title: "Introduction",
      note: "Context and purpose.",
      type: "prose",
      intro: [
        "I am a pre-service teacher in the BTVTED program at the Technological University of the Philippines - Taguig, majoring in Computer Programming. For the first trimester of S.Y. 2026–2027 I taught Grade 7 TLE and Grade 12 TechPro at President Diosdado Macapagal High School, handling the TLE: FCS subject across Sections Jeremiah, King, and Leviticus.",
      ],
      introImage: "assets/pre-service.png",
      introImageHover: "assets/uniformed.png",
      meta: [
        ["Program", "BTVTED, Major in Computer Programming"],
        ["Placement", "Grade 7 TLE (FCS), Sections Jeremiah, King, Leviticus"],
        ["Partner school", "President Diosdado Macapagal High School"],
        ["Period", "First trimester, S.Y. 2026–2027"],
        ["Cooperating teacher", "Ferdinand S. Baltazar"],
        ["Institution", "Technological University of the Philippines - Taguig"]
      ]
    },
    {
      roman: "III",
      title: "About the Teacher (Curriculum Vitae)",
      note: "Education, placement, skills.",
      type: "cv",
      intro: [
        "My background is in computer programming, and my field study put that background in front of Grade 7 learners for a trimester."
      ],
      cv: {
        education: {
          title: "BTVTED, Major in Computer Programming",
          lines: ["Technological University of the Philippines - Taguig", "In progress"]
        },
        practice: {
          title: "Field Study, Grade 7 TLE (ICT)",
          lines: ["President Diosdado Macapagal High School", "First trimester, S.Y. 2026–2027", "Cooperating Teacher: Ferdinand S. Baltazar"]
        },
        skills: [
          "Computer programming fundamentals",
          "ICT integration in TLE",
          "Lesson and assessment design",
          "Classroom management",
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
          desc: "One page, with education, field study placement, skills, and references.",
          type: "Image",
          files: ["documents/curriculum-vitae.png"]
        }
      ]
    },
    {
      roman: "IV",
      title: "Learning Environment (Partner School)",
      note: "Partner school profile.",
      type: "docs",
      vision: "To produce high school graduates who are God-fearing, morally upright, socially responsible, creative thinker, civic spirited and life skilled- a product of holistic and innovative learning.",
      mission: "To provide world-class, superior, high quality, responsive secondary education to students transforming them to be very prepared to enter higher education and at the same time, responsible, humane and productive citizens.",
      history: [
        "President Diosdado Macapagal High School (PDMHS) was conceived in 1999, when residents of Barangay Katuparan requested a school for their community. The request was granted, and the Bases Conversion and Development Authority donated the land; groundbreaking took place on August 15, 2005.",
        ],
      figure: {
        src: "assets/pdmhs-bldg.png",
        alt: "Photograph of the President Diosdado Macapagal High School campus",
        caption: "President Diosdado Macapagal High School."
      },
      cards: [
        "documents/school-grounds/campus-01.png",
        "documents/school-grounds/campus-02.png",
        "documents/school-grounds/campus-03.png"
      ],
      docs: []
    },
    {
      roman: "V",
      title: "Curriculum and Planning",
      note: "The teaching load, documented.",
      type: "docs",
      intro: [
        "The planning documents follow the order of the teaching cycle: the annotated DLL, competencies, management, daily logs, lesson plans, materials, and assessment."
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
      showcase: [
        "documents/pd-certificates/01.jpg",
        "documents/pd-certificates/02.jpg",
        "documents/pd-certificates/04.jpg",
        "documents/pd-certificates/05.jpg",
        "documents/pd-certificates/03.jpg"
      ],
      showcaseDoc: "pd-certificates",
      docs: [
        {
          slug: "pd-certificates",
          ts: "TS9",
          group: "Professional development organizations",
          title: "Professional Development Certificates",
          desc: "Certificates from seminars and training organized by professional development providers.",
          type: "PDF",
          files: [
            "documents/pd-certificates.pdf",
            "documents/pd-certificates/01.jpg",
            "documents/pd-certificates/02.jpg",
            "documents/pd-certificates/04.jpg",
            "documents/pd-certificates/05.jpg",
            "documents/pd-certificates/03.jpg"
          ]
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
      carousel: {
        label: "Photo documentation",
        slides: [
          {
            image: "documents/microteaching-dlp/01.png",
            title: "Documentation 01",
            caption: "Microteaching demonstration lesson, photograph 1 of 3.",
            alt: "Photograph from the microteaching demonstration lesson"
          },
          {
            image: "documents/microteaching-dlp/02.png",
            title: "Documentation 02",
            caption: "Microteaching demonstration lesson, photograph 2 of 3.",
            alt: "Photograph from the microteaching demonstration lesson"
          },
          {
            image: "documents/microteaching-dlp/03.png",
            title: "Documentation 03",
            caption: "Microteaching demonstration lesson, photograph 3 of 3.",
            alt: "Photograph from the microteaching demonstration lesson"
          }
        ]
      },
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
          type: "PDF",
          files: [
            "documents/microteaching-dlp.pdf"
          ]
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
          type: "PDF",
          files: [
            "documents/action-research-data-bank.pdf",
            "documents/action-research-data-bank-revised.pdf"
          ]
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
      quote: "As a future educator, I want to become a teacher who believes in every student's capacity to learn and grow.",
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
        "Records and attachments. The cooperating teacher's evaluation and the daily time record for the field study period are filed below."
      ],
      docs: [
        {
          slug: "ct-evaluation",
          ts: "TS13",
          group: "Filed with this portfolio",
          title: "Evaluation from CT",
          desc: "The cooperating teacher's completed evaluation form, with ratings and written comments.",
          type: "PDF"
        },
        {
          slug: "daily-time-record",
          group: "Filed with this portfolio",
          title: "Daily Time Record",
          desc: "The DTR for the field study period, signed by the cooperating teacher.",
          type: "PDF"
        }
      ]
    }
  ]
};
