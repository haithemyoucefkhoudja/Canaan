type StoryElement = {
  text: string;
  category: string;
  position: { x: number; y: number };
  style: {
    background: string;
    color: string;
    width: number;
    height: number;
    edgeColor: string;
  };
  options: string[];
  correctAnswer: string;
};

type StoryConnection = {
  from: number;
  to: number;
  relationship: string;
  color: string;
};

export type HistoricalEvent = {
  title: string;
  date: string;
  location: string;
  outcome: string;
  storyElements: StoryElement[];
  storyConnections: StoryConnection[];
  tags: string[];
  actors: string[];
  locations: string[];
  related_places: { type: string; name: string }[];
  dateOptions: string[];
  locationOptions: string[];
  outcomeOptions: string[];
};


export const events: HistoricalEvent[]  = [
  // Event 1: Cross-Border Attacks from Gaza
  {
    title: "Qadri Tuqan Publishes 'Ba'd al-Nakba' (After the Nakba)",
    date: "January 1950",
    location: "Beirut, Lebanon",
    outcome: "Influential work of self-criticism calling for scientific and educational reform in the Arab world.",
    storyElements: [
      {
        text: "In the wake of the 1948 'Nakba' (Catastrophe), Arab intellectuals began to analyze the causes of the defeat.",
        category: "context",
        position: { x: 100, y: 200 },
        style: {
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          color: "#333",
          width: 250,
          height: 90,
          edgeColor: "#c3cfe2",
        },
        options: [
          "Arab intellectuals began to analyze the causes of the defeat.",
          "A military coalition was formed to retake territory.",
          "Most refugees were able to return to their homes.",
          "International aid successfully rebuilt the region.",
        ],
         correctAnswer: "Arab intellectuals began to analyze the causes of the defeat.",
      },
      {
        text: "Prominent Palestinian intellectual Qadri Tuqan publishes his book 'Ba'd al-Nakba' in Beirut. [1]",
        category: "action",
        position: { x: 400, y: 100 },
        style: {
          background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
          color: "#333",
          width: 260,
          height: 90,
          edgeColor: "#a1c4fd",
        },
        options: [
          "Qadri Tuqan publishes his book 'Ba'd al-Nakba'. [1]",
          "Constantine Zurayk publishes 'Ma'na al-Nakba'. [3]",
          "Musa Alami founds the Arab Development Society.",
          "Ghassan Kanafani writes 'Men in the Sun'.",
        ],
        correctAnswer: "Qadri Tuqan publishes his book 'Ba'd al-Nakba'. [1]",
      },
      {
        text: "Tuqan's book argues that the defeat was an inevitable result of Arabs ignoring science and rational methods. [2]",
        category: "thesis",
        position: { x: 700, y: 200 },
        style: {
          background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
          color: "#333",
          width: 250,
          height: 90,
          edgeColor: "#d299c2",
        },
        options: [
          "The defeat was caused by overwhelming foreign intervention.",
          "The defeat resulted from ignoring science and rational methods. [2]",
          "The defeat was caused by overwhelming foreign intervention.",
          "The defeat was due to a lack of religious faith.",
          "The defeat resulted from poor military leadership alone.",
        ],
        correctAnswer: "The defeat resulted from ignoring science and rational methods. [2]",
      },
      {
        text: "He stresses that the only way to overcome the Nakba is through acquiring scientific knowledge and combating ignorance. [2]",
        category: "solution",
        position: { x: 400, y: 350 },
        style: {
          background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
          color: "#333",
          width: 260,
          height: 90,
          edgeColor: "#66a6ff",
        },
        options: [
          "The solution is to appeal for a UN-mandated state.",
          "The solution is an immediate military counter-attack.",
          "The solution is acquiring scientific knowledge and combating ignorance. [2]",
          "The solution is to focus solely on preserving cultural traditions.",
        ],
        correctAnswer: "The solution is acquiring scientific knowledge and combating ignorance. [2]",
      },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "prompts", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "argues", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "therefore proposes", color: "#d299c2" },
    ],
    tags: ["Cultural", "Policy-Program"],
    actors: ["Palestine Non-Governmental"],
    locations: ["Lebanon"],
    related_places: [],
    dateOptions: [
      "January 1950",
      "August 1948",
      "May 1949",
      "June 1951",
    ],
    locationOptions: [
      "Beirut, Lebanon",
      "Amman, Jordan",
      "Cairo, Egypt",
      "Damascus, Syria",
    ],
    outcomeOptions: [
      "A call for scientific and educational reform in the Arab world. [2]",
      "The formation of a new Palestinian political party.",
      "An agreement to publish the book in multiple languages.",
      "Immediate funding for new scientific universities.",
    ],
  },
  {
    title: "Dissolution of the Jordanian Parliament",
    date: "1 January 1950",
    location: "Jordan, West Bank",
    outcome: "New elections scheduled to formally include the West Bank.",
    storyElements: [
      {
        text: "Jordan aims to hold new elections to include parliamentary deputies from the recently-annexed West Bank.",
        category: "goal",
        position: { x: 150, y: 150 },
        style: {
          background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
          color: "#333",
          width: 260,
          height: 90,
          edgeColor: "#a1c4fd",
        },
        options: [
          "Jordan aims to hold elections to include West Bank deputies.",
          "Jordan decides to postpone elections in the West Bank.",
          "Jordan plans to reduce the number of parliamentary seats.",
          "The UN calls for internationally-supervised elections in Jordan.",
        ],
      },
      {
        text: "To enable these new elections, King Abdullah dissolves the current Jordanian parliament.",
        category: "action",
        position: { x: 500, y: 150 },
        style: {
          background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
          color: "#333",
          width: 250,
          height: 90,
          edgeColor: "#ff9a9e",
        },
        options: [
          "King Abdullah dissolves the current Jordanian parliament.",
          "The Jordanian parliament votes to dissolve itself.",
          "King Abdullah suspends the constitution by royal decree.",
          "The Prime Minister and his cabinet resign.",
        ],
      },
      {
        text: "New parliamentary elections are officially scheduled to be held on 11 April 1950.",
        category: "consequence",
        position: { x: 325, y: 350 },
        style: {
          background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
          color: "#333",
          width: 250,
          height: 80,
          edgeColor: "#d299c2",
        },
        options: [
          "New parliamentary elections are scheduled for 11 April 1950.",
          "A constitutional referendum is scheduled for 11 April 1950.",
          "Martial law is declared until new elections can be held.",
          "The election date is postponed indefinitely.",
        ],
      },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "motivates", color: "#a1c4fd" },
      { from: 1, to: 2, relationship: "leads to", color: "#ff9a9e" },
    ],
    tags: ["Institutional", "Politics"],
    actors: ["Jordan Governmental"],
    locations: ["Jordan", "West Bank"],
    related_places: [],
    dateOptions: [
      "1 January 1950",
      "11 April 1950",
      "24 April 1950",
      "1 December 1949",
    ],
    locationOptions: [
      "Jordan, West Bank",
      "Amman, Jordan",
      "Jerusalem",
      "Jordan, Syria",
    ],
    outcomeOptions: [
      "New elections scheduled to formally include the West Bank.",
      "The parliament was suspended for a year.",
      "The West Bank was given a separate legislative council.",
      "King Abdullah assumed direct legislative authority.",
    ],
  },
  {
    title: "Cross-Border Attacks from Gaza",
    date: "1950-1956",
    location: "Gaza Strip, Israel",
    outcome: "Cycle of attacks and Israeli reprisals leading to the 1956 Suez Crisis",
    storyElements: [
        {
            text: "Palestinian refugees, displaced by the 1948 war, begin infiltrating Israel for economic reasons and to retrieve property.",
            category: "trigger",
            position: { x: 100, y: 150 },
            style: { background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", color: "#333", width: 250, height: 90, edgeColor: "#c3cfe2" },
            options: ["Palestinian refugees begin infiltrating Israel for economic reasons.", "Palestinian refugees start crossing into Israel to access their former lands.", "Displaced Palestinians cross the border to retrieve property.", "Palestinians begin cross-border movements for economic survival."],
        },
        {
            text: "Egypt, controlling Gaza, begins to sponsor and train armed Fedayeen units from groups like the Muslim Brotherhood.",
            category: "organization",
            position: { x: 400, y: 100 },
            style: { background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", color: "#333", width: 260, height: 90, edgeColor: "#ff9a9e" },
            options: ["Egypt sponsors and trains armed Fedayeen units.", "The Egyptian government starts supporting militant groups in Gaza.", "Fedayeen groups receive training and backing from Egypt.", "Egypt organizes armed Palestinian units for cross-border operations."],
        },
        {
            text: "Fedayeen launch cross-border attacks from Gaza into Israel, targeting civilians and infrastructure.",
            category: "action",
            position: { x: 700, y: 150 },
            style: { background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", color: "#333", width: 250, height: 80, edgeColor: "#66a6ff" },
            options: ["Fedayeen launch cross-border attacks from Gaza.", "Militants conduct raids from Gaza into Israeli territory.", "Armed groups initiate attacks on Israel from the Gaza Strip.", "Fedayeen carry out cross-border assaults on Israeli targets."],
        },
        {
            text: "Israel responds with large-scale military reprisal operations against targets in Gaza and the West Bank.",
            category: "response",
            position: { x: 550, y: 350 },
            style: { background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", color: "#333", width: 240, height: 80, edgeColor: "#d299c2" },
            options: ["Israel responds with military reprisal operations.", "The Israeli army carries out retaliatory raids.", "Israel launches counter-attacks in response to the raids.", "Military reprisals are conducted by Israeli forces."],
        },
        {
            text: "The cycle of Fedayeen raids and Israeli reprisals escalates tensions, contributing to the 1956 Suez Crisis.",
            category: "consequence",
            position: { x: 250, y: 380 },
            style: { background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", width: 260, height: 90, edgeColor: "#667eea" },
            options: ["The cycle of violence contributes to the 1956 Suez Crisis.", "Escalating attacks and reprisals lead to the Suez War.", "The ongoing conflict culminates in the 1956 Suez Crisis.", "The tensions result in the outbreak of the Suez Crisis."],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "evolves into", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "enables", color: "#ff9a9e" },
      { from: 2, to: 3, relationship: "triggers", color: "#66a6ff" },
      { from: 3, to: 4, relationship: "escalates into", color: "#d299c2" },
      { from: 0, to: 4, relationship: "ultimately causes", color: "#667eea" },
    ],
    tags: ["Violence", "State Actor", "Non-State Actor"],
    actors: ["Egypt Non-Governmental", "Palestine Non-Governmental", "Israel Governmental"],
    locations: ["Gaza Strip", "Israel"],
    related_places: [],
    dateOptions: ["1950-1956", "1948-1950", "1956-1960", "1967-1970"],
    locationOptions: ["Gaza Strip, Israel", "West Bank, Jordan", "Sinai Peninsula, Egypt", "Golan Heights, Syria"],
    outcomeOptions: ["Cycle of attacks and Israeli reprisals leading to the 1956 Suez Crisis.", "A lasting ceasefire agreement was signed.", "The United Nations established a permanent peacekeeping force.", "The attacks ceased without a clear resolution."],
  },

  // Event 2: Palestinian Peasants in Tiberias
 
{
    title: "Cross-Border Attacks from Gaza",
    date: "1950",
    location: "Gaza Strip, Israel",
    outcome: "A cycle of cross-border attacks and Israeli reprisals begins.",
    storyElements: [
        {
            text: "Armed fedayeen launch cross-border attacks from Gaza into Israel.",
            category: "action",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Armed fedayeen launch cross-border attacks from Gaza into Israel.",
                "Militant groups carry out raids from the Gaza Strip into Israeli territory.",
                "Palestinian fighters initiate assaults from Gaza across the armistice line.",
                "Armed units based in Gaza conduct attacks inside Israel's borders.",
            ],
        },
        {
            text: "The attacks are organized by units of the Muslim Brotherhood and Communists.",
            category: "organization",
            position: { x: 150, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The attacks are organized by units of the Muslim Brotherhood and Communists.",
                "Units of the Muslim Brotherhood and Communists plan the cross-border raids.",
                "The raids are orchestrated by Muslim Brotherhood and Communist groups.",
                "Communist and Muslim Brotherhood units are behind the organization of the attacks.",
            ],
        },
        {
            text: "The attacks are a response to prior Israeli actions.",
            category: "trigger",
            position: { x: 650, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 240, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The attacks are a response to prior Israeli actions.",
                "The raids come as a reaction to actions taken by Israel.",
                "The fedayeen attacks are initiated in response to actions by Israel.",
                "Israeli actions are the trigger for the cross-border attacks from Gaza.",
            ],
        },
    ],
    storyConnections: [
      { from: 2, to: 0, relationship: "triggers", color: "#d299c2" },
      { from: 1, to: 0, relationship: "enables", color: "#a1c4fd" },
    ],
    tags: ["Violence"],
    actors: ["Egypt Non-Governmental", "Palestine Non-Governmental", "Israel Governmental"],
    locations: ["Gaza Strip", "Israel"],
    related_places: [],
    dateOptions: [
        "1950", 
        "1948", 
        "1956", 
        "1949"
    ],
    locationOptions: [
        "Gaza Strip, Israel", 
        "West Bank, Jordan", 
        "Sinai, Egypt", 
        "Lebanon"
    ],
    outcomeOptions: [
        "A cycle of cross-border attacks and Israeli reprisals begins.",
        "A lasting ceasefire is immediately signed by both sides.",
        "The border between Gaza and Israel is permanently closed.",
        "The United Nations intervenes and creates a buffer zone.",
    ],
  },

  //event 5


{
    title: "Israel's Measures to Make Jerusalem Its Capital",
    date: "23 January 1950 - 13 July 1953",
    location: "Jerusalem",
    outcome: "Israel establishes Jerusalem as its capital by moving its government institutions there.",
    storyElements: [
        {
            text: "The Knesset proclaims that 'Jerusalem has returned to be its capital.'",
            category: "proclamation",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The Knesset proclaims that 'Jerusalem has returned to be its capital.'",
                "A proclamation is issued by the Knesset declaring Jerusalem as the capital.",
                "Israel's parliament announces that Jerusalem is once again the capital city.",
                "The Knesset makes a formal statement about Jerusalem's status as the capital.",
            ],
        },
        {
            text: "This was a response to a UN resolution confirming an international regime for the city.",
            category: "trigger",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "This was a response to a UN resolution confirming an international regime for the city.",
                "It was a reaction to a UN resolution that affirmed an international status for Jerusalem.",
                "The move responded to a UN decision to make Jerusalem an international city.",
                "It came after the UN passed a resolution for an international administration of the city.",
            ],
        },
        {
            text: "Most government ministries are transferred to Jerusalem by the end of 1951.",
            category: "action",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Most government ministries are transferred to Jerusalem by the end of 1951.",
                "By the end of 1951, the majority of government offices had been moved to Jerusalem.",
                "The transfer of most ministries to Jerusalem was completed by the end of 1951.",
                "Government offices were largely relocated to Jerusalem by the close of 1951.",
            ],
        },
        {
            text: "The Ministry of Foreign Affairs is the last to move, on 13 July 1953.",
            category: "exception",
            position: { x: 650, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 240, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The Ministry of Foreign Affairs is the last to move, on 13 July 1953.",
                "The final ministry to relocate, the Foreign Ministry, did so on 13 July 1953.",
                "On 13 July 1953, the transfer of the Foreign Affairs Ministry was completed.",
                "The move of the Foreign Ministry occurred last, on 13 July 1953.",
            ],
        },
        {
            text: "The Ministry of Defense remains in Tel Aviv for security reasons.",
            category: "exception",
            position: { x: 150, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 240, 
                height: 80, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The Ministry of Defense remains in Tel Aviv for security reasons.",
                "For security purposes, the Defense Ministry was kept in Tel Aviv.",
                "The Defense Ministry stayed in Tel Aviv due to security concerns.",
                "It was decided to keep the Ministry of Defense in Tel Aviv for security.",
            ],
        },
    ],
    storyConnections: [
      { from: 1, to: 0, relationship: "triggers", color: "#c3cfe2" },
      { from: 0, to: 2, relationship: "leads to", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "except for", color: "#d299c2" },
      { from: 2, to: 4, relationship: "except for", color: "#d299c2" },
    ],
    tags: ["Legal", "Institutional"],
    actors: ["Israel Governmental"],
    locations: ["Jerusalem"],
    related_places: [],
    dateOptions: [
        "23 January 1950 - 13 July 1953",
        "13 December 1949 - 23 January 1950",
        "23 January 1951 - 13 July 1952",
        "13 July 1953 - 1 January 1954",
    ],
    locationOptions: [
        "Jerusalem",
        "Tel Aviv",
        "Haifa",
        "Hebron",
    ],
    outcomeOptions: [
        "Israel establishes Jerusalem as its capital by moving its government institutions there.",
        "The UN reverses its resolution and recognizes Jerusalem as the capital.",
        "A permanent international regime is established for the city.",
        "Government ministries are divided equally between Tel Aviv and Jerusalem.",
    ],
  },

  //event 6

{
    title: "Absentee Property Law, 5710-1950",
    date: "14 March 1950",
    location: "Israel",
    outcome: "A legal framework is created for the state to take control of Palestinian refugee property.",
    storyElements: [
        {
            text: "The law seeks to 'legalize' the confiscation of property left by Palestinian refugees.",
            category: "goal",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The law seeks to 'legalize' the confiscation of property left by Palestinian refugees.",
                "The legislation aims to provide a legal basis for seizing refugee property.",
                "The purpose of the law is to legitimize the takeover of property from refugees.",
                "The state creates a law to formally justify the seizure of refugee assets.",
            ],
        },
        {
            text: "It defines an 'absentee' as any Arab who left his residence during the war.",
            category: "definition",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "It defines an 'absentee' as any Arab who left his residence during the war.",
                "The law's definition of 'absentee' includes any Arab who departed their home in the war.",
                "An 'absentee' is defined as any Arab person who left their place of living during the conflict.",
                "Under the law, an Arab who left their home during the war is classified as an 'absentee'.",
            ],
        },
        {
            text: "Absentees’ property is automatically transferred to the 'Custodian of Absentee Property.'",
            category: "mechanism",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Absentees’ property is automatically transferred to the 'Custodian of Absentee Property.'",
                "Property of absentees is moved by default to the control of the 'Custodian of Absentee Property.'",
                "The 'Custodian of Absentee Property' takes automatic control of the property of absentees.",
                "An automatic transfer of absentee property to the 'Custodian of Absentee Property' occurs.",
            ],
        },
        {
            text: "The Custodian can then sell the property to the 'Development Authority.'",
            category: "consequence",
            position: { x: 650, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 240, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The Custodian can then sell the property to the 'Development Authority.'",
                "The 'Development Authority' is allowed to purchase the property from the Custodian.",
                "The Custodian is authorized to sell the assets to the 'Development Authority.'",
                "It is permitted for the property to be sold by the Custodian to the 'Development Authority.'",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "requires a", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "triggers", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "enables", color: "#d299c2" },
    ],
    tags: ["Legal", "Colonization"],
    actors: ["Israel Governmental"],
    locations: ["Israel"],
    related_places: [],
    dateOptions: [
        "14 March 1950",
        "14 December 1948",
        "14 March 1949",
        "14 May 1950",
    ],
    locationOptions: [
        "Israel",
        "The West Bank",
        "Jerusalem",
        "Gaza Strip",
    ],
    outcomeOptions: [
        "A legal framework is created for the state to take control of Palestinian refugee property.",
        "A system is established for the state to manage assets of Palestinian refugees.",
        "The state gains a legal method for acquiring the property of refugees.",
        "A law is passed that allows the government to seize refugee property.",
    ],
  },

  //event7

  // Add this event object to your 'events.ts' file

{
    title: "Special International Regime for Jerusalem",
    date: "4 April 1950",
    location: "Jerusalem",
    outcome: "A statute is approved to make Jerusalem an international city under UN administration.",
    storyElements: [
        {
            text: "The UN Trusteeship Council approves a Statute for Jerusalem.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The UN Trusteeship Council approves a Statute for Jerusalem.",
                "A Statute for Jerusalem is approved by the UN Trusteeship Council.",
                "The UN Trusteeship Council endorses a specific Statute for Jerusalem.",
                "Approval is given by the UN Trusteeship Council for a Jerusalem Statute.",
            ],
        },
        {
            text: "The statute provides for a Special International Regime for the city.",
            category: "provision",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The statute provides for a Special International Regime for the city.",
                "A Special International Regime for the city is established by the statute.",
                "The statute's text outlines a Special International Regime for the city.",
                "Provision is made in the statute for a Special International Regime for the city.",
            ],
        },
        {
            text: "It constitutes the city as a corpus separatum under UN administration.",
            category: "status",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "It constitutes the city as a corpus separatum under UN administration.",
                "The city is made a corpus separatum to be administered by the UN.",
                "It establishes Jerusalem as a corpus separatum under the UN's administration.",
                "Under the statute, the city becomes a corpus separatum managed by the UN.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which provides for a", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "and constitutes it as a", color: "#a1c4fd" },
    ],
    tags: ["Diplomatic", "Policy-Program"],
    actors: ["UN Inter-Governmental"],
    locations: ["Jerusalem"],
    related_places: [],
    dateOptions: [
        "4 April 1950",
        "23 January 1950",
        "13 December 1949",
        "4 April 1951",
    ],
    locationOptions: [
        "Jerusalem",
        "Tel Aviv",
        "Geneva, Switzerland",
        "New York, USA",
    ],
    outcomeOptions: [
        "A statute is approved to make Jerusalem an international city under UN administration.",
        "A plan to create an international zone in Jerusalem is formally approved.",
        "The UN approves a statute for an international administration of Jerusalem.",
        "A formal statute is passed to put Jerusalem under a UN-managed international regime.",
    ],
  },

  //event8
  // Add this event object to your 'events.ts' file

{
    title: "Jordanian Parliamentary Elections; Formal Unification of the Two Banks",
    date: "11 April 1950 - 24 April 1950",
    location: "Jordan, West Bank",
    outcome: "The East and West Banks are formally unified into the Hashemite Kingdom of Jordan.",
    storyElements: [
        {
            text: "Parliamentary elections are held with 20 representatives from the East Bank and 20 from the West Bank.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Parliamentary elections are held with 20 representatives from the East Bank and 20 from the West Bank.",
                "Elections for parliament take place, with 20 deputies elected from each of the two banks.",
                "The country holds parliamentary elections, choosing 20 representatives from both East and West Banks.",
                "With 20 members elected from each bank, parliamentary elections are conducted.",
            ],
        },
        {
            text: "The new National Assembly (Senate and Chamber of Deputies) confirms the unification of the two banks.",
            category: "resolution",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The new National Assembly (Senate and Chamber of Deputies) confirms the unification of the two banks.",
                "The unification of the banks is confirmed by the new National Assembly's two houses.",
                "Confirmation of the unification of the two banks comes from the new National Assembly.",
                "The two houses of the new National Assembly ratify the unification of the banks.",
            ],
        },
        {
            text: "This confirmation creates a single state: the Hashemite Kingdom of Jordan.",
            category: "outcome",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "This confirmation creates a single state: the Hashemite Kingdom of Jordan.",
                "A single state, the Hashemite Kingdom of Jordan, is formed by this confirmation.",
                "The result of this confirmation is one state called the Hashemite Kingdom of Jordan.",
                "The Hashemite Kingdom of Jordan is established as a single state following the confirmation.",
            ],
        },
        {
            text: "A Royal Assent promulgates the Act of the National Assembly on the same day.",
            category: "legalization",
            position: { x: 650, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 240, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "A Royal Assent promulgates the Act of the National Assembly on the same day.",
                "The National Assembly's Act is put into law by a Royal Assent that day.",
                "On the same day, the Act of the National Assembly is enacted via Royal Assent.",
                "The law is made official through a Royal Assent on the same day.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "elects", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "which creates", color: "#a1c4fd" },
      { from: 1, to: 3, relationship: "is legalized by", color: "#a1c4fd" },
    ],
    tags: ["Institutional", "Legal"],
    actors: ["Jordan Governmental", "Palestine Quasi-Governmental"],
    locations: ["Jordan", "West Bank"],
    related_places: [],
    dateOptions: [
        "11 April 1950 - 24 April 1950",
        "13 December 1949 - 11 April 1950",
        "24 April 1950 - 1 May 1950",
        "11 April 1949 - 24 April 1949",
    ],
    locationOptions: [
        "Jordan, West Bank",
        "Amman, Jordan",
        "Jerusalem",
        "East Bank only",
    ],
    outcomeOptions: [
        "The East and West Banks are formally unified into the Hashemite Kingdom of Jordan.",
        "Formal unification of the two banks into one kingdom, the Hashemite Kingdom of Jordan, occurs.",
        "A single state, the Hashemite Kingdom of Jordan, is formed by formally unifying the two banks.",
        "The Hashemite Kingdom of Jordan is created through the official unification of the East and West Banks.",
    ],
  },

  //event9
  // Add this event object to your 'events.ts' file

{
    title: "Great Britain Announces Formal Recognition of Extended Kingdom of Jordan and de jure Recognition of Israel Simultaneously",
    date: "27 April 1950",
    location: "Great Britain",
    outcome: "Britain recognizes both the expanded Kingdom of Jordan and the State of Israel, but withholds recognition of sovereignty over Jerusalem.",
    storyElements: [
        {
            text: "Great Britain accords formal recognition to the union of Jordan and the West Bank.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Great Britain accords formal recognition to the union of Jordan and the West Bank.",
                "Formal recognition is given by Great Britain to the Jordan-West Bank union.",
                "The union of Jordan and the West Bank is formally recognized by Great Britain.",
                "Great Britain officially recognizes the unification of Jordan and the West Bank.",
            ],
        },
        {
            text: "The Anglo-Jordan Treaty of Alliance is made applicable to all territory in the union.",
            category: "consequence",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The Anglo-Jordan Treaty of Alliance is made applicable to all territory in the union.",
                "Provisions of the Anglo-Jordan Treaty now apply to the entire unified territory.",
                "The alliance treaty with Jordan is extended to cover all land in the union.",
                "Applicability of the Anglo-Jordan Treaty is extended to the whole union.",
            ],
        },
        {
            text: "Simultaneously, Great Britain accords de jure recognition to the State of Israel.",
            category: "action",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Simultaneously, Great Britain accords de jure recognition to the State of Israel.",
                "De jure recognition is granted to Israel by Great Britain at the same time.",
                "At the same moment, Israel receives de jure recognition from Great Britain.",
                "Great Britain gives de jure recognition to the State of Israel concurrently.",
            ],
        },
        {
            text: "Britain withholds recognition of sovereignty over Jerusalem, only allowing de facto control.",
            category: "exception",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Britain withholds recognition of sovereignty over Jerusalem, only allowing de facto control.",
                "Sovereignty over Jerusalem is not recognized by Britain, merely de facto control.",
                "Britain only recognizes de facto control over Jerusalem, not full sovereignty.",
                "Recognition of sovereignty over Jerusalem is withheld by Britain, allowing only for de facto status.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which extends the", color: "#c3cfe2" },
      { from: 0, to: 3, relationship: "but with an", color: "#c3cfe2" },
      { from: 2, to: 3, relationship: "but with an", color: "#d299c2" },
    ],
    tags: ["Diplomatic"],
    actors: ["Israel Governmental", "Great Britain Governmental"],
    locations: ["Great Britain"],
    related_places: [],
    dateOptions: [
        "27 April 1950",
        "24 April 1950",
        "15 March 1948",
        "27 April 1949",
    ],
    locationOptions: [
        "Great Britain",
        "Jerusalem",
        "Jordan",
        "Israel",
    ],
    outcomeOptions: [
        "Britain recognizes both the expanded Kingdom of Jordan and the State of Israel, but withholds recognition of sovereignty over Jerusalem.",
        "Both the union of Jordan and the state of Israel are recognized by Britain, with an exception for Jerusalem's sovereignty.",
        "Britain acknowledges the expanded Jordanian kingdom and Israel, while not recognizing sovereignty over Jerusalem.",
        "Recognition is granted to Jordan's union and Israel, though Britain withholds recognition of sovereignty for Jerusalem.",
    ],
  },

  //event10
  // Add this event object to your 'events.ts' file

{
    title: "Elections at al-Urwa al-Wuthqa Society",
    date: "May 1950",
    location: "Lebanon",
    outcome: "The Arab Nationalists' list wins all seats, solidifying their influence in the student society.",
    storyElements: [
        {
            text: "Al-Urwa al-Wuthqa Society, a student group at AUB, holds its annual elections.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Al-Urwa al-Wuthqa Society, a student group at AUB, holds its annual elections.",
                "The annual elections of the al-Urwa al-Wuthqa Society, a student association at AUB, take place.",
                "A student society at AUB, al-Urwa al-Wuthqa, conducts its yearly elections.",
                "The holding of annual elections occurs at AUB's al-Urwa al-Wuthqa student society.",
            ],
        },
        {
            text: "The Arab Nationalists' list wins all eight seats, with George Habash elected president.",
            category: "outcome",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The Arab Nationalists' list wins all eight seats, with George Habash elected president.",
                "All eight seats are won by the Arab Nationalists' list, and George Habash becomes president.",
                "George Habash is elected president as the Arab Nationalists' list secures all eight seats.",
                "A clean sweep of all eight seats is achieved by the Arab Nationalists' list, making George Habash president.",
            ],
        },
        {
            text: "Many members are inspired by their faculty advisor, Constantine Zurayk.",
            category: "influence",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Many members are inspired by their faculty advisor, Constantine Zurayk.",
                "Constantine Zurayk, the faculty advisor, serves as an inspiration for many members.",
                "The society's faculty advisor, Constantine Zurayk, inspires many of the members.",
                "Inspiration for many members comes from their faculty advisor, Constantine Zurayk.",
            ],
        },
        {
            text: "Zurayk promotes Arab nationalism, unity, and rationalism as necessary for the struggle.",
            category: "ideology",
            position: { x: 650, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Zurayk promotes Arab nationalism, unity, and rationalism as necessary for the struggle.",
                "Arab nationalism, unity, and rationalism are promoted by Zurayk as essential for the struggle.",
                "The promotion of Arab nationalism, unity, and rationalism as needed for the struggle is done by Zurayk.",
                "The struggle requires Arab nationalism, unity, and rationalism, according to Zurayk's promotion.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "results in", color: "#c3cfe2" },
      { from: 2, to: 1, relationship: "inspires", color: "#d299c2" },
      { from: 2, to: 3, relationship: "whose ideas promote", color: "#d299c2" },
    ],
    tags: ["Institutional", "Popular action"],
    actors: ["Arabs Non-Governmental", "Palestine Non-Governmental"],
    locations: ["Lebanon"],
    related_places: [],
    dateOptions: [
        "May 1950",
        "August 1948",
        "May 1949",
        "January 1950",
    ],
    locationOptions: [
        "Lebanon",
        "Syria",
        "Jordan",
        "Egypt",
    ],
    outcomeOptions: [
        "The Arab Nationalists' list wins all seats, solidifying their influence in the student society.",
        "A victory by the Arab Nationalists' list in all seats strengthens their position in the society.",
        "The society's leadership is fully taken by the Arab Nationalists' list after winning the election.",
        "Winning every seat, the Arab Nationalists' list cements its control over the student society.",
    ],
  },

  //event11

  // Add this event object to your 'events.ts' file

{
    title: "Expulsion from Hebron Area",
    date: "3 May 1950",
    location: "Hebron, West Bank",
    outcome: "12,000 Palestinians are expelled by Israeli forces from two villages in the Hebron area.",
    storyElements: [
        {
            text: "Israeli forces drive 12,000 Palestinians from 2 villages in the Hebron area.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Israeli forces drive 12,000 Palestinians from 2 villages in the Hebron area.",
                "12,000 Palestinians are driven out of 2 villages near Hebron by Israeli forces.",
                "The expulsion of 12,000 Palestinians from 2 Hebron-area villages is conducted by Israeli forces.",
                "From 2 villages in the Hebron region, Israeli forces expel 12,000 Palestinians.",
            ],
        },
        {
            text: "The expulsion included thousands of dunams of land ready to be harvested.",
            category: "consequence",
            position: { x: 400, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The expulsion included thousands of dunams of land ready to be harvested.",
                "Thousands of dunams of land, prepared for harvesting, were part of the affected area.",
                "The land from which people were expelled contained thousands of harvest-ready dunams.",
                "The area affected by the expulsion had thousands of dunams of land ready for harvest.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "affecting", color: "#ff9a9e" },
    ],
    tags: ["Violence"],
    actors: ["Israel Governmental", "Palestine Non-Governmental"],
    locations: ["Jordan", "West Bank"],
    related_places: [{ "type": "Place", "name": "Hebron" }],
    dateOptions: [
        "3 May 1950",
        "27 April 1950",
        "3 June 1950",
        "3 May 1951",
    ],
    locationOptions: [
        "Hebron, West Bank",
        "Jerusalem",
        "Gaza Strip",
        "Nablus, West Bank",
    ],
    outcomeOptions: [
        "12,000 Palestinians are expelled by Israeli forces from two villages in the Hebron area.",
        "Israeli forces drive out 12,000 Palestinians from a pair of villages near Hebron.",
        "The expulsion of 12,000 Palestinians from two Hebron villages by Israeli forces occurs.",
        "Two villages in the Hebron area see 12,000 Palestinians expelled by Israeli forces.",
    ],
  },

  //event12
  // Add this event object to your 'events.ts' file

{
    title: "Tripartite Declaration",
    date: "25 May 1950",
    location: "Great Britain",
    outcome: "The US, UK, and France jointly guarantee the regional status quo and commit to limiting arms sales.",
    storyElements: [
        {
            text: "The US, Britain, and France jointly issue the Tripartite Declaration.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The US, Britain, and France jointly issue the Tripartite Declaration.",
                "A joint declaration is issued by the US, Britain, and France.",
                "The Tripartite Declaration is issued jointly by the US, Britain, and France.",
                "France, Britain, and the US collaborate to issue a joint declaration.",
            ],
        },
        {
            text: "It guarantees the territorial status quo from the armistice agreements.",
            category: "provision",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It guarantees the territorial status quo from the armistice agreements.",
                "The territorial status quo determined by the armistice is guaranteed.",
                "A guarantee is made for the territorial status quo established in the armistice.",
                "The declaration assures the territorial status quo of the armistice deals.",
            ],
        },
        {
            text: "It undertakes to limit an Arab-Israeli arms race.",
            category: "provision",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "It undertakes to limit an Arab-Israeli arms race.",
                "A commitment is made to limit the arms race between Arabs and Israelis.",
                "The declaration includes an undertaking to curtail an Arab-Israeli arms race.",
                "It makes a pledge to restrict the buildup of arms between Arabs and Israelis.",
            ],
        },
        {
            text: "The declaration is intended to convince Arabs and Israelis to focus on the Soviet threat.",
            category: "motive",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The declaration is intended to convince Arabs and Israelis to focus on the Soviet threat.",
                "The purpose of the declaration is to make Arabs and Israelis concentrate on the Soviet threat.",
                "It is meant to persuade Arabs and Israelis to direct their attention to the Soviet threat.",
                "The goal is to convince Arabs and Israelis to see the Soviet threat as the main issue.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which guarantees", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "and undertakes to", color: "#a1c4fd" },
      { from: 0, to: 3, relationship: "and intends to", color: "#a1c4fd" },
    ],
    tags: ["Diplomatic", "Policy-Program"],
    actors: ["USA Governmental", "Great Britain Governmental", "France Governmental"],
    locations: ["Great Britain"],
    related_places: [],
    dateOptions: [
        "25 May 1950",
        "27 April 1950",
        "25 June 1950",
        "25 May 1951",
    ],
    locationOptions: [
        "Great Britain",
        "Washington D.C., USA",
        "Paris, France",
        "Jerusalem",
    ],
    outcomeOptions: [
        "The US, UK, and France jointly guarantee the regional status quo and commit to limiting arms sales.",
        "A joint guarantee of the status quo and a pledge to limit arms sales is made by the three powers.",
        "The three Western powers guarantee the status quo and agree to restrict the regional arms race.",
        "A commitment to guarantee the status quo and limit arms sales is issued by the US, UK, and France.",
    ],
  },

  //event13
  // Add this event object to your 'events.ts' file

{
    title: "Israeli Law of Return",
    date: "5 July 1950",
    location: "Israel",
    outcome: "A law is passed granting any Jew the right to immigrate and receive automatic rights as citizens.",
    storyElements: [
        {
            text: "Israel's Knesset passes the Law of Return.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 80, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Israel's Knesset passes the Law of Return.",
                "The Law of Return is passed by the Israeli Knesset.",
                "The Knesset in Israel enacts the Law of Return.",
                "Passage of the Law of Return is completed by Israel's Knesset.",
            ],
        },
        {
            text: "The law declares that every Jew has the right to settle in Israel as an immigrant ('oleh').",
            category: "provision",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The law declares that every Jew has the right to settle in Israel as an immigrant ('oleh').",
                "Every Jew is given the right to settle in Israel as an immigrant ('oleh') by the law.",
                "The right for every Jew to settle in Israel as an immigrant ('oleh') is declared in the law.",
                "A declaration in the law states that any Jew can settle in Israel as an immigrant ('oleh').",
            ],
        },
        {
            text: "It gives Jewish immigrants automatic rights that no other non-Jewish potential immigrants may enjoy.",
            category: "consequence",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "It gives Jewish immigrants automatic rights that no other non-Jewish potential immigrants may enjoy.",
                "Automatic rights are granted to Jewish immigrants, which are not available to non-Jewish immigrants.",
                "Jewish immigrants receive automatic rights under the law that non-Jews are denied.",
                "The law provides Jewish immigrants with automatic rights not extended to other potential immigrants.",
            ],
        },
        {
            text: "The law was a precondition to enshrine the privileged status of Israeli Jews before a citizenship law.",
            category: "strategy",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The law was a precondition to enshrine the privileged status of Israeli Jews before a citizenship law.",
                "Before a citizenship law, this law was needed to establish the privileged status of Israeli Jews.",
                "This law was created first to guarantee the special status of Israeli Jews ahead of a citizenship law.",
                "To ensure the privileged status of Israeli Jews, this law was passed as a precursor to a citizenship law.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which declares", color: "#a1c4fd" },
      { from: 1, to: 2, relationship: "resulting in", color: "#d299c2" },
      { from: 0, to: 3, relationship: "as a", color: "#a1c4fd" },
    ],
    tags: ["Legal", "Institutional", "Policy-Program"],
    actors: ["Israel Governmental"],
    locations: ["Israel"],
    related_places: [],
    dateOptions: [
        "5 July 1950",
        "14 March 1950",
        "5 July 1951",
        "14 May 1948",
    ],
    locationOptions: [
        "Israel",
        "Jerusalem",
        "The West Bank",
        "Tel Aviv",
    ],
    outcomeOptions: [
        "A law is passed granting any Jew the right to immigrate and receive automatic rights as citizens.",
        "Any Jew is given the right to immigrate and gain automatic citizenship rights through a new law.",
        "A new law gives all Jews the right to immigrate and receive automatic rights of a citizen.",
        "The right to immigrate and automatic citizenship for all Jews is established by a new law.",
    ],
  },

  //event14

  // Add this event object to your 'events.ts' file

{
    title: "Development Authority (Transfer of Property) Law, 5710-1950",
    date: "9 August 1950",
    location: "Israel",
    outcome: "An agency is created to sell Palestinian absentee property to the state and Jewish organizations, ensuring permanent control.",
    storyElements: [
        {
            text: "This law closes the loop of Israel's appropriation of Palestinian 'absentees' lands.",
            category: "purpose",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "This law closes the loop of Israel's appropriation of Palestinian 'absentees' lands.",
                "The legislation finalizes the process of Israel taking over Palestinian absentee lands.",
                "This law serves to complete Israel's appropriation of land from Palestinian absentees.",
                "The loop of Israel's land appropriation from Palestinian absentees is closed by this law.",
            ],
        },
        {
            text: "It creates the Development Authority, an extragovernmental agency.",
            category: "action",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "It creates the Development Authority, an extragovernmental agency.",
                "An extragovernmental agency called the Development Authority is established by the law.",
                "The law brings into being the Development Authority, an agency outside the government.",
                "The creation of the Development Authority, an extragovernmental agency, is stipulated.",
            ],
        },
        {
            text: "The Authority is entitled to sell property to the State and the Jewish National Fund.",
            category: "power",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The Authority is entitled to sell property to the State and the Jewish National Fund.",
                "Selling property to the State and the Jewish National Fund is a right given to the Authority.",
                "The Authority is given the power to sell property to the Jewish National Fund and the State.",
                "The entitlement to sell property to the State and Jewish National Fund is granted to the Authority.",
            ],
        },
        {
            text: "This ensures full and permanent Jewish control over Arab land.",
            category: "goal",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "This ensures full and permanent Jewish control over Arab land.",
                "Full and permanent Jewish control over Arab land is ensured by this.",
                "This method guarantees complete and lasting Jewish control over Arab land.",
                "The result is the assurance of full, permanent control by Jews over Arab land.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "by creating", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "which can sell to", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "to ensure", color: "#d299c2" },
    ],
    tags: ["Legal", "Colonization"],
    actors: ["Israel Governmental"],
    locations: ["Israel"],
    related_places: [],
    dateOptions: [
        "9 August 1950",
        "14 March 1950",
        "5 July 1950",
        "9 August 1951",
    ],
    locationOptions: [
        "Israel",
        "Jerusalem",
        "The West Bank",
        "Tel Aviv",
    ],
    outcomeOptions: [
        "An agency is created to sell Palestinian absentee property to the state and Jewish organizations, ensuring permanent control.",
        "To ensure permanent control, an agency is made to sell absentee property to the state and Jewish groups.",
        "The state and Jewish organizations can buy absentee property from a new agency, finalizing control.",
        "A new agency is formed to sell Palestinian absentee property to the state and Jewish organizations for permanent control.",
    ],
  },

  //event15

  // Add this event object to your 'events.ts' file

{
    title: "UNRWA Signs Agreement with Egypt as Administrator of Refugee Host Area",
    date: "12 September 1950",
    location: "Gaza Strip",
    outcome: "An agreement is signed defining UNRWA's status in Gaza and giving Egypt authority over refugee lists.",
    storyElements: [
        {
            text: "Egypt and UNRWA sign an agreement relative to UNRWA’s status in Egyptian-controlled Gaza.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Egypt and UNRWA sign an agreement relative to UNRWA’s status in Egyptian-controlled Gaza.",
                "An agreement is signed by Egypt and UNRWA concerning UNRWA's status in Gaza.",
                "UNRWA and Egypt enter into an agreement about the agency's status in the Gaza Strip.",
                "The signing of an agreement between Egypt and UNRWA regarding its status in Gaza occurs.",
            ],
        },
        {
            text: "The agreement covers UNRWA's privileges, immunities, and provision of services to refugees.",
            category: "scope",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The agreement covers UNRWA's privileges, immunities, and provision of services to refugees.",
                "The scope of the agreement includes UNRWA's privileges, immunities, and refugee services.",
                "UNRWA's immunities, privileges, and services for refugees are detailed in the agreement.",
                "The accord deals with the privileges, immunities, and services UNRWA provides to refugees.",
            ],
        },
        {
            text: "Egypt agrees to provide UNRWA with its existing lists of refugees.",
            category: "provision",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Egypt agrees to provide UNRWA with its existing lists of refugees.",
                "The existing lists of refugees in Egypt's possession are to be given to UNRWA.",
                "An agreement is made for Egypt to hand over its current refugee lists to UNRWA.",
                "UNRWA is set to receive the lists of refugees currently held by Egypt.",
            ],
        },
        {
            text: "Egypt retains sole authority for making deletions from the refugee lists.",
            category: "power",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Egypt retains sole authority for making deletions from the refugee lists.",
                "The sole authority to remove names from the refugee lists is kept by Egypt.",
                "Only Egypt has the authority to make deletions from the lists of refugees.",
                "The power to delete names from the refugee lists remains exclusively with Egypt.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which covers", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "and includes", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "but gives Egypt power over", color: "#ff9a9e" },
    ],
    tags: ["Diplomatic", "Institutional"],
    actors: ["Egypt Governmental", "UN Inter-Governmental"],
    locations: ["Palestine", "Gaza Strip"],
    related_places: [],
    dateOptions: [
        "12 September 1950",
        "9 August 1950",
        "12 October 1950",
        "12 September 1951",
    ],
    locationOptions: [
        "Gaza Strip",
        "Cairo, Egypt",
        "Beirut, Lebanon",
        "Amman, Jordan",
    ],
    outcomeOptions: [
        "An agreement is signed defining UNRWA's status in Gaza and giving Egypt authority over refugee lists.",
        "A deal is made to define UNRWA's role in Gaza, with Egypt controlling the refugee lists.",
        "The status of UNRWA in Gaza is defined by an agreement that gives Egypt power over refugee lists.",
        "An accord is signed about UNRWA's status in Gaza, establishing Egyptian control of refugee lists.",
    ],
  },
  //event16

  // Add this event object to your 'events.ts' file

{
    title: "UNGA 393 (V): Economic Reintegration of Refugees in the Middle East",
    date: "2 December 1950",
    location: "New York, USA",
    outcome: "The UN shifts focus towards the economic reintegration of refugees, either by repatriation or resettlement.",
    storyElements: [
        {
            text: "The General Assembly recognizes that direct relief for refugees cannot be terminated.",
            category: "finding",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The General Assembly recognizes that direct relief for refugees cannot be terminated.",
                "It is recognized by the General Assembly that direct relief must continue for refugees.",
                "The continuation of direct relief for refugees is acknowledged by the General Assembly.",
                "The General Assembly finds that the termination of direct aid to refugees is not possible.",
            ],
        },
        {
            text: "It considers the reintegration of refugees into the economic life of the Middle East as essential.",
            category: "goal",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "It considers the reintegration of refugees into the economic life of the Middle East as essential.",
                "The economic reintegration of refugees in the Middle East is viewed as essential.",
                "It is considered essential to reintegrate refugees into the economic life of the Middle East.",
                "The Assembly views the economic reintegration of refugees in the Middle East as a key goal.",
            ],
        },
        {
            text: "This reintegration can be done either by repatriation or resettlement.",
            category: "method",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "This reintegration can be done either by repatriation or resettlement.",
                "The methods for this reintegration are either repatriation or resettlement.",
                "Either repatriation or resettlement are the proposed means for this reintegration.",
                "The two options for this reintegration are repatriation and resettlement.",
            ],
        },
        {
            text: "This is essential for future peace and for when international assistance is no longer available.",
            category: "motive",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "This is essential for future peace and for when international assistance is no longer available.",
                "It is necessary for peace and for the time when international aid ends.",
                "The purpose is to prepare for peace and the eventual end of international assistance.",
                "This is required for achieving peace and in preparation for the cessation of international aid.",
            ],
        },
    ],
    storyConnections: [
      { from: 1, to: 0, relationship: "despite", color: "#a1c4fd" },
      { from: 1, to: 2, relationship: "achieved by", color: "#a1c4fd" },
      { from: 1, to: 3, relationship: "in preparation for", color: "#a1c4fd" },
    ],
    tags: ["Diplomatic"],
    actors: ["UN Inter-Governmental"],
    locations: [],
    related_places: [],
    dateOptions: [
        "2 December 1950",
        "12 September 1950",
        "2 December 1949",
        "25 May 1950",
    ],
    locationOptions: [
        "New York, USA",
        "Jerusalem",
        "Geneva, Switzerland",
        "London, Great Britain",
    ],
    outcomeOptions: [
        "The UN shifts focus towards the economic reintegration of refugees, either by repatriation or resettlement.",
        "A UN resolution emphasizes the economic reintegration of refugees through repatriation or resettlement.",
        "The UN highlights the need to reintegrate refugees economically via repatriation or resettlement.",
        "A new UN focus is placed on the economic reintegration of refugees by means of repatriation or resettlement.",
    ],
  },

  //event17
  // Add this event object to your 'events.ts' file

{
    title: "UNGA 394 (V): UNCCP to Establish Office on Compensation to Refugees",
    date: "14 December 1950",
    location: "New York, USA",
    outcome: "The UN urges negotiations to settle outstanding issues and directs the UNCCP to create an office for refugee compensation.",
    storyElements: [
        {
            text: "The resolution urges concerned governments to enter into negotiations to settle outstanding questions.",
            category: "call_to_action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The resolution urges concerned governments to enter into negotiations to settle outstanding questions.",
                "Concerned governments are urged by the resolution to start talks to resolve pending issues.",
                "A call is made in the resolution for involved governments to negotiate and settle open questions.",
                "The resolution pushes the relevant governments to begin negotiations on settling all remaining matters.",
            ],
        },
        {
            text: "Negotiations can be held either with the UNCCP or directly.",
            category: "method",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Negotiations can be held either with the UNCCP or directly.",
                "The talks can take place with the UNCCP or on a direct basis.",
                "It is possible for negotiations to occur with the UNCCP or directly between the parties.",
                "The resolution allows for negotiations to be conducted either through the UNCCP or directly.",
            ],
        },
        {
            text: "It directs the UNCCP to establish an office to deal with refugee compensation.",
            category: "directive",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It directs the UNCCP to establish an office to deal with refugee compensation.",
                "The UNCCP is directed to create an office for handling refugee compensation.",
                "An office to manage refugee compensation is to be established by the UNCCP per the directive.",
                "The resolution instructs the UNCCP to set up an office to address refugee compensation.",
            ],
        },
        {
            text: "This office will handle the assessment and payment of compensation.",
            category: "function",
            position: { x: 650, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 240, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "This office will handle the assessment and payment of compensation.",
                "The assessment and payment of compensation will be managed by this office.",
                "The function of this office will be to handle compensation assessment and payment.",
                "This office is tasked with the assessment and subsequent payment of compensation.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "conducted via", color: "#c3cfe2" },
      { from: 2, to: 3, relationship: "which will handle", color: "#d299c2" },
    ],
    tags: ["Diplomatic"],
    actors: ["UN Inter-Governmental"],
    locations: [],
    related_places: [],
    dateOptions: [
        "14 December 1950",
        "2 December 1950",
        "12 September 1950",
        "14 December 1949",
    ],
    locationOptions: [
        "New York, USA",
        "Jerusalem",
        "Geneva, Switzerland",
        "London, Great Britain",
    ],
    outcomeOptions: [
        "The UN urges negotiations to settle outstanding issues and directs the UNCCP to create an office for refugee compensation.",
        "A UN resolution calls for talks on unresolved issues and tasks the UNCCP with setting up a refugee compensation office.",
        "The UNCCP is directed to form a refugee compensation office, while the UN pushes for negotiations on outstanding matters.",
        "A call for negotiations on open issues is made by the UN, which also directs the UNCCP to establish a compensation office.",
    ],
  },

  //event18

  // Add this event object to your 'events.ts' file

{
    title: "Led by George Habash, Arab Nationalist Activists on the Way to Structure Their Movement",
    date: "1 January 1951 - 30 November 1952",
    location: "Lebanon",
    outcome: "The Arab Nationalist Youth movement is formed, establishing a public front and a weekly bulletin.",
    storyElements: [
        {
            text: "George Habash and associates decide to establish a secret Arab nationalist organization.",
            category: "decision",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "George Habash and associates decide to establish a secret Arab nationalist organization.",
                "The decision to create a secret Arab nationalist organization is made by Habash and his group.",
                "A secret Arab nationalist organization is planned for establishment by George Habash and his allies.",
                "Habash and his colleagues resolve to form a clandestine Arab nationalist organization.",
            ],
        },
        {
            text: "After failing to find common ground with other activists, they form their own movement.",
            category: "action",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "After failing to find common ground with other activists, they form their own movement.",
                "They create their own movement following unsuccessful attempts to align with other activists.",
                "Their own movement is formed after they cannot find common ground with other activists.",
                "The failure to find common ground with others leads them to establish their own movement.",
            ],
        },
        {
            text: "They stage student demonstrations in Beirut to express solidarity on various issues.",
            category: "tactic",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "They stage student demonstrations in Beirut to express solidarity on various issues.",
                "Student protests are organized by them in Beirut to show solidarity on different causes.",
                "In Beirut, they hold student demonstrations as a way to express solidarity on several issues.",
                "To show solidarity, they organize a series of student demonstrations in Beirut.",
            ],
        },
        {
            text: "The 'Organization for Resisting Peace with Israel' is established as the movement's public face.",
            category: "creation",
            position: { x: 150, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The 'Organization for Resisting Peace with Israel' is established as the movement's public face.",
                "As the public front for the movement, the 'Organization for Resisting Peace with Israel' is created.",
                "The establishment of the 'Organization for Resisting Peace with Israel' serves as the movement's public face.",
                "The public face of the movement is created with the establishment of the 'Organization for Resisting Peace with Israel'.",
            ],
        },
        {
            text: "A weekly bulletin, 'al-Tha'r' [Vengeance], is launched in November 1952.",
            category: "publication",
            position: { x: 650, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", 
                color: "#333", 
                width: 240, 
                height: 90, 
                edgeColor: "#66a6ff" 
            },
            options: [
                "A weekly bulletin, 'al-Tha'r' [Vengeance], is launched in November 1952.",
                "In November 1952, a weekly publication called 'al-Tha'r' [Vengeance] is started.",
                "The launch of a weekly bulletin, 'al-Tha'r' [Vengeance], happens in November 1952.",
                "November 1952 marks the launch of the weekly bulletin 'al-Tha'r' [Vengeance].",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "leads to", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "which stages", color: "#a1c4fd" },
      { from: 1, to: 3, relationship: "creating public face", color: "#a1c4fd" },
      { from: 3, to: 4, relationship: "which launches", color: "#ff9a9e" },
    ],
    tags: ["Institutional", "Popular action"],
    actors: ["Arabs Non-Governmental", "Palestine Non-Governmental"],
    locations: ["Arab League", "Lebanon"],
    related_places: [],
    dateOptions: [
        "1 January 1951 - 30 November 1952",
        "May 1950 - March 1951",
        "October 1951 - January 1952",
        "November 1952 - January 1953",
    ],
    locationOptions: [
        "Lebanon",
        "Syria",
        "Jordan",
        "Egypt",
    ],
    outcomeOptions: [
        "The Arab Nationalist Youth movement is formed, establishing a public front and a weekly bulletin.",
        "Formation of the Arab Nationalist Youth movement occurs, which creates a public organization and bulletin.",
        "A public front and weekly bulletin are established after the Arab Nationalist Youth movement is formed.",
        "The creation of the Arab Nationalist Youth movement leads to a public organization and a weekly publication.",
    ],
  },
  
  //event19
  // Add this event object to your 'events.ts' file

{
    title: "Palestinian Memorandum to UNCCP, Beirut",
    date: "27 January 1951",
    location: "Lebanon",
    outcome: "A refugee congress sends a memorandum demanding return, rejecting integration, and proposing a joint body to manage property.",
    storyElements: [
        {
            text: "The General Palestinian Refugee Congress in Lebanon sends a Memorandum to the UNCCP.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The General Palestinian Refugee Congress in Lebanon sends a Memorandum to the UNCCP.",
                "A Memorandum is sent to the UNCCP by the General Palestinian Refugee Congress in Lebanon.",
                "The UNCCP receives a Memorandum from the General Palestinian Refugee Congress in Lebanon.",
                "The sending of a Memorandum to the UNCCP by the General Palestinian Refugee Congress in Lebanon occurs.",
            ],
        },
        {
            text: "It affirms the refugees' 'unflinching hope in their return to their homes'.",
            category: "affirmation",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "It affirms the refugees' 'unflinching hope in their return to their homes'.",
                "The 'unflinching hope' of refugees to return home is affirmed in the document.",
                "The memorandum states the unwavering hope of refugees for their return home.",
                "It confirms the refugees' strong hope of returning to their homes and properties.",
            ],
        },
        {
            text: "The committee rejects the idea of integration in host countries.",
            category: "rejection",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The committee rejects the idea of integration in host countries.",
                "The idea of integration within host countries is rejected by the committee.",
                "A rejection of the concept of integration in host countries is made by the committee.",
                "The committee expresses its opposition to the idea of integration in host countries.",
            ],
        },
        {
            text: "It protests Israeli laws concerning the seizure of Palestinian properties.",
            category: "protest",
            position: { x: 150, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#66a6ff" 
            },
            options: [
                "It protests Israeli laws concerning the seizure of Palestinian properties.",
                "A protest is made against Israeli laws about the seizure of Palestinian properties.",
                "The memorandum objects to Israeli laws regarding the confiscation of Palestinian property.",
                "It contains a protest against Israeli legislation on the seizure of Palestinian assets.",
            ],
        },
        {
            text: "It requests a joint UN-refugee committee to administer absentee properties.",
            category: "proposal",
            position: { x: 650, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 240, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "It requests a joint UN-refugee committee to administer absentee properties.",
                "A request is made for a joint UN-refugee committee to manage absentee properties.",
                "The memorandum proposes a joint committee of UN and refugee members to administer properties.",
                "It asks for the creation of a joint UN-refugee committee for the administration of absentee property.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which affirms", color: "#c3cfe2" },
      { from: 0, to: 2, relationship: "and rejects", color: "#c3cfe2" },
      { from: 0, to: 3, relationship: "and protests", color: "#c3cfe2" },
      { from: 0, to: 4, relationship: "and requests", color: "#c3cfe2" },
    ],
    tags: ["Popular action", "Policy-Program"],
    actors: ["Palestine Non-Governmental"],
    locations: ["Lebanon"],
    related_places: [],
    dateOptions: [
        "27 January 1951",
        "14 December 1950",
        "27 February 1951",
        "29 November 1947",
    ],
    locationOptions: [
        "Lebanon",
        "Syria",
        "Jordan",
        "Gaza Strip",
    ],
    outcomeOptions: [
        "A refugee congress sends a memorandum demanding return, rejecting integration, and proposing a joint body to manage property.",
        "A memo from a refugee congress demands return, refuses integration, and suggests a joint committee for property administration.",
        "The demand for return, rejection of integration, and a proposal for a joint property committee is sent by a refugee congress.",
        "A joint property body, the demand for return, and the rejection of integration are outlined in a refugee congress memorandum.",
    ],
  },

  //event20

  // Add this event object to your 'events.ts' file

{
    title: "UNRWA Signs Agreement with Jordan as Refugee Host Country",
    date: "14 March 1951 - 20 August 1951",
    location: "Jordan",
    outcome: "An agreement on UNRWA's status is signed after a dispute over the wording concerning control of refugee lists.",
    storyElements: [
        {
            text: "Jordan and UNRWA sign an agreement defining the agency's status and responsibilities.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Jordan and UNRWA sign an agreement defining the agency's status and responsibilities.",
                "An agreement defining UNRWA's status and duties is signed by Jordan.",
                "The signing of an agreement between Jordan and UNRWA outlines the agency's role.",
                "UNRWA and Jordan enter into an accord that defines the agency's responsibilities.",
            ],
        },
        {
            text: "A dispute arises over the Arabic text requiring 'agreement' vs. the English text requiring 'consultation' on refugee lists.",
            category: "dispute",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 120, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "A dispute arises over the Arabic text requiring 'agreement' vs. the English text requiring 'consultation' on refugee lists.",
                "Conflict emerges from the Arabic version needing 'agreement' while the English needs 'consultation' for refugee lists.",
                "The difference between 'agreement' (Arabic) and 'consultation' (English) on refugee lists causes a dispute.",
                "A disagreement occurs because the Arabic text demands 'agreement' on refugee lists, unlike the English text's 'consultation'.",
            ],
        },
        {
            text: "The UNRWA director eventually signs the Arabic version on 20 August.",
            category: "resolution",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The UNRWA director eventually signs the Arabic version on 20 August.",
                "On 20 August, the director of UNRWA finally signs the Arabic text.",
                "The signing of the Arabic version by the UNRWA director happens on 20 August.",
                "Ultimately, the Arabic version is signed on 20 August by the UNRWA director.",
            ],
        },
        {
            text: "He clarifies in a letter that agency funds are not for 'non-refugee needy.'",
            category: "clarification",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "He clarifies in a letter that agency funds are not for 'non-refugee needy.'",
                "A letter from him clarifies that funds are not available for the 'non-refugee needy'.",
                "In a letter, he stresses that the agency's money is not meant for the 'non-refugee needy'.",
                "The clarification is made in a letter that agency funds will not be used for the 'non-refugee needy'.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "but contains a", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "which leads to", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "with a", color: "#d299c2" },
    ],
    tags: ["Diplomatic", "Institutional"],
    actors: ["Jordan Governmental", "UN Inter-Governmental"],
    locations: ["Jordan", "West Bank"],
    related_places: [],
    dateOptions: [
        "14 March 1951 - 20 August 1951",
        "14 March 1951 - 20 July 1951",
        "20 August 1951 - 1 September 1951",
        "12 September 1950 - 14 March 1951",
    ],
    locationOptions: [
        "Jordan",
        "Lebanon",
        "Syria",
        "Egypt",
    ],
    outcomeOptions: [
        "An agreement on UNRWA's status is signed after a dispute over the wording concerning control of refugee lists.",
        "After a conflict over wording about refugee list control, an agreement on UNRWA's status is signed.",
        "The signing of an agreement on UNRWA's status follows a dispute over language related to refugee list authority.",
        "A disagreement about wording for refugee list control precedes the signing of an agreement on UNRWA's status.",
    ],
  },
  
  //event21
  // Add this event object to your 'events.ts' file

{
    title: "Palestinian Memorandum to UNCCP, Ramallah",
    date: "July 1951",
    location: "West Bank",
    outcome: "A refugee congress demands implementation of the 1947 partition plan, with the right of return or compensation for refugees.",
    storyElements: [
        {
            text: "The General Refugee Congress in Ramallah addresses a memorandum to the UNCCP.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The General Refugee Congress in Ramallah addresses a memorandum to the UNCCP.",
                "A memorandum is sent to the UNCCP by the General Refugee Congress in Ramallah.",
                "The UNCCP receives a memorandum from the General Refugee Congress based in Ramallah.",
                "The addressing of a memorandum to the UNCCP by the Ramallah Refugee Congress occurs.",
            ],
        },
        {
            text: "It demands the partition of Palestine be in accordance with the 1947 UN resolution.",
            category: "demand",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "It demands the partition of Palestine be in accordance with the 1947 UN resolution.",
                "The memo calls for the 1947 UN resolution on partition to be implemented.",
                "A demand is made for the partition of Palestine to follow the 1947 UN resolution.",
                "The memorandum insists that the partition plan from the 1947 UN resolution be used.",
            ],
        },
        {
            text: "It demands that refugees should be allowed to return to their homes.",
            category: "demand",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It demands that refugees should be allowed to return to their homes.",
                "The right of refugees to return to their homes is demanded in the memorandum.",
                "The memo calls for refugees to be permitted to return to their homes.",
                "A key demand is that the return of refugees to their homes should be allowed.",
            ],
        },
        {
            text: "It demands compensation for refugees who do not wish to return.",
            category: "demand",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "It demands compensation for refugees who do not wish to return.",
                "Compensation for refugees who choose not to return is a demand in the memo.",
                "The memorandum calls for refugees who don't want to return to be compensated.",
                "A demand is made that refugees who opt not to return should receive compensation.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which demands", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "and", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "or", color: "#d299c2" },
    ],
    tags: ["Popular action", "Policy-Program"],
    actors: ["Palestine Non-Governmental"],
    locations: ["West Bank"],
    related_places: [],
    dateOptions: [
        "July 1951",
        "27 January 1951",
        "November 1947",
        "August 1951",
    ],
    locationOptions: [
        "Ramallah, West Bank",
        "Beirut, Lebanon",
        "Amman, Jordan",
        "Damascus, Syria",
    ],
    outcomeOptions: [
        "A refugee congress demands implementation of the 1947 partition plan, with the right of return or compensation for refugees.",
        "The implementation of the 1947 partition plan and the right of return or compensation is demanded by a refugee congress.",
        "A demand for the 1947 partition plan's implementation, including return or compensation, is made by a refugee congress.",
        "A refugee congress issues a demand for the 1947 partition plan to be followed, allowing for return or compensation.",
    ],
  },

  //event22

  // Add this event object to your 'events.ts' file

{
    title: "Assassination of King Abdullah",
    date: "20 July 1951 - 11 August 1952",
    location: "Jerusalem",
    outcome: "King Abdullah is assassinated and is eventually succeeded by his grandson Hussein after a brief period of rule by his son Talal.",
    storyElements: [
        {
            text: "King Abdullah is assassinated on the steps of Jerusalem's al-Aqsa Mosque.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "King Abdullah is assassinated on the steps of Jerusalem's al-Aqsa Mosque.",
                "On the steps of the al-Aqsa Mosque in Jerusalem, King Abdullah is assassinated.",
                "The assassination of King Abdullah takes place on the steps of the al-Aqsa Mosque.",
                "King Abdullah's assassination occurs at the al-Aqsa Mosque in Jerusalem.",
            ],
        },
        {
            text: "He is succeeded by his son Talal.",
            category: "succession",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "He is succeeded by his son Talal.",
                "His son Talal succeeds him on the throne.",
                "The succession passes to his son, Talal.",
                "Talal, his son, becomes his successor.",
            ],
        },
        {
            text: "Talal abdicates in favor of his son Hussein on 11 August 1952.",
            category: "succession",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Talal abdicates in favor of his son Hussein on 11 August 1952.",
                "On 11 August 1952, Talal gives up the throne for his son Hussein.",
                "The abdication of Talal in favor of his son Hussein occurs on 11 August 1952.",
                "Hussein becomes the successor after his father Talal abdicates on 11 August 1952.",
            ],
        },
        {
            text: "A Regency Council assumes power until Hussein comes of age.",
            category: "interim",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "A Regency Council assumes power until Hussein comes of age.",
                "Until Hussein is old enough, a Regency Council takes power.",
                "Power is held by a Regency Council during the period before Hussein comes of age.",
                "A council of regents is put in place to rule until Hussein is of age.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "leading to", color: "#ff9a9e" },
      { from: 1, to: 2, relationship: "who then", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "necessitating an", color: "#d299c2" },
    ],
    tags: ["Violence", "Biographical"],
    actors: ["Palestine Non-Governmental", "Jordan Governmental"],
    locations: ["Jerusalem", "Jordan", "West Bank"],
    related_places: [],
    dateOptions: [
        "20 July 1951 - 11 August 1952",
        "20 July 1951 - 2 May 1953",
        "11 August 1952 - 2 May 1953",
        "20 July 1951 - 20 August 1951",
    ],
    locationOptions: [
        "Jerusalem",
        "Amman, Jordan",
        "Ramallah, West Bank",
        "London, Great Britain",
    ],
    outcomeOptions: [
        "King Abdullah is assassinated and is eventually succeeded by his grandson Hussein after a brief period of rule by his son Talal.",
        "The assassination of King Abdullah leads to his grandson Hussein taking the throne after his son Talal's short reign.",
        "After King Abdullah is assassinated, his grandson Hussein becomes king, following the brief rule of his son Talal.",
        "Following the assassination of King Abdullah, his son Talal rules for a short time before being succeeded by his own son, Hussein.",
    ],
  },

  //event23

  // Add this event object to your 'events.ts' file

{
    title: "23rd Zionist Congress Is Held in Jerusalem",
    date: "14 August 1951 - 30 August 1951",
    location: "Jerusalem",
    outcome: "The congress redefines Zionism's aims in the 'Jerusalem Program' and formalizes the WZO's relationship with Israel.",
    storyElements: [
        {
            text: "The Zionist Congress meets in Jerusalem for the first time since the WZO was established.",
            category: "context",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The Zionist Congress meets in Jerusalem for the first time since the WZO was established.",
                "For the first time since the WZO's creation, the Zionist Congress convenes in Jerusalem.",
                "The first meeting of the Zionist Congress in Jerusalem since the WZO's founding takes place.",
                "Jerusalem hosts the Zionist Congress for the first time since the establishment of the WZO.",
            ],
        },
        {
            text: "The congress redefines the aims of Zionism in the 'Jerusalem Program'.",
            category: "redefinition",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The congress redefines the aims of Zionism in the 'Jerusalem Program'.",
                "In the 'Jerusalem Program', the aims of Zionism are redefined by the congress.",
                "A redefinition of Zionist aims is presented by the congress in the 'Jerusalem Program'.",
                "The 'Jerusalem Program' is created by the congress to redefine the goals of Zionism.",
            ],
        },
        {
            text: "It proposes legislation recognizing the WZO as the representative of the Jewish people.",
            category: "proposal",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It proposes legislation recognizing the WZO as the representative of the Jewish people.",
                "A proposal is made for a law that recognizes the WZO as the Jewish people's representative.",
                "The congress suggests legislation to formally recognize the WZO as the Jewish people's representative body.",
                "Legislation is proposed to have the WZO recognized as the official representative of the Jewish people.",
            ],
        },
        {
            text: "It regards the Keren Kayemeth Leisrael and Keren Hayesod as its key instruments.",
            category: "instruments",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "It regards the Keren Kayemeth Leisrael and Keren Hayesod as its key instruments.",
                "The Keren Kayemeth Leisrael and Keren Hayesod are considered its main instruments.",
                "Its primary tools are regarded as being the Keren Kayemeth Leisrael and Keren Hayesod.",
                "The congress views the Keren Kayemeth Leisrael and Keren Hayesod as its chief instruments.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "where it creates the", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "and proposes", color: "#a1c4fd" },
      { from: 1, to: 3, relationship: "using", color: "#a1c4fd" },
    ],
    tags: ["Policy-Program", "Institutional"],
    actors: ["Zionists Quasi-Governmental"],
    locations: ["Israel", "Jerusalem"],
    related_places: [],
    dateOptions: [
        "14 August 1951 - 30 August 1951",
        "14 July 1951 - 30 July 1951",
        "14 August 1897 - 30 August 1897",
        "14 August 1952 - 30 August 1952",
    ],
    locationOptions: [
        "Jerusalem",
        "Tel Aviv",
        "Basel, Switzerland",
        "London, Great Britain",
    ],
    outcomeOptions: [
        "The congress redefines Zionism's aims in the 'Jerusalem Program' and formalizes the WZO's relationship with Israel.",
        "The 'Jerusalem Program' is created to redefine Zionist goals, and the WZO's relationship with Israel is formalized.",
        "A redefinition of Zionist aims in the 'Jerusalem Program' and a formalization of the WZO-Israel relationship occurs.",
        "The WZO's role relative to Israel is formalized and the aims of Zionism are redefined in the 'Jerusalem Program'.",
    ],
  },

  //event24

  // Add this event object to your 'events.ts' file

{
    title: "SC Res. 95: Calling on Egypt to End Restrictions on Commercial Shipping through Suez Canal",
    date: "1 September 1951",
    location: "Suez Canal",
    outcome: "The UN Security Council calls on Egypt to end restrictions on shipping to Israel through the Suez Canal.",
    storyElements: [
        {
            text: "Following a complaint by Israel, the UN Security Council issues Resolution 95.",
            category: "context",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Following a complaint by Israel, the UN Security Council issues Resolution 95.",
                "Resolution 95 is issued by the UN Security Council after a complaint from Israel.",
                "After Israel complains, the UN Security Council passes Resolution 95.",
                "The UN Security Council's Resolution 95 comes as a result of a complaint by Israel.",
            ],
        },
        {
            text: "It finds that Egyptian interference with shipping is an 'abuse' and not justified by self-defense.",
            category: "finding",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "It finds that Egyptian interference with shipping is an 'abuse' and not justified by self-defense.",
                "The resolution states that Egypt's interference is an 'abuse' and cannot be justified as self-defense.",
                "The finding is that Egyptian interference with shipping is an 'abuse' not covered by self-defense claims.",
                "It concludes that Egypt's shipping interference is an 'abuse' and that self-defense is not a valid justification.",
            ],
        },
        {
            text: "It calls upon Egypt to 'terminate the restrictions' on commercial shipping through the Suez Canal.",
            category: "directive",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It calls upon Egypt to 'terminate the restrictions' on commercial shipping through the Suez Canal.",
                "Egypt is called upon to 'terminate the restrictions' on commercial shipping in the Suez Canal.",
                "The resolution calls for Egypt to end restrictions on commercial shipping passing through the Suez Canal.",
                "A call is made for Egypt to 'terminate the restrictions' on commercial Suez Canal shipping.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which finds", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "and therefore calls for", color: "#a1c4fd" },
    ],
    tags: ["Diplomatic", "Sanctions"],
    actors: ["UN Inter-Governmental", "Egypt Governmental", "Israel Governmental"],
    locations: [],
    related_places: [],
    dateOptions: [
        "1 September 1951",
        "25 May 1950",
        "1 October 1951",
        "1 September 1950",
    ],
    locationOptions: [
        "Suez Canal",
        "New York, USA",
        "Cairo, Egypt",
        "Jerusalem",
    ],
    outcomeOptions: [
        "The UN Security Council calls on Egypt to end restrictions on shipping to Israel through the Suez Canal.",
        "A UN resolution calls for Egypt to stop its restrictions on commercial shipping to Israel in the Suez Canal.",
        "Egypt is called upon by the UNSC to end its restrictions on shipping destined for Israel via the Suez Canal.",
        "The UNSC demands Egypt cease restrictions on Suez Canal shipping bound for Israel.",
    ],
  },

  //event25

  // Add this event object to your 'events.ts' file

{
    title: "Publication of the Constitution of the Hashemite Kingdom of Jordan",
    date: "8 January 1952",
    location: "Jordan",
    outcome: "A new constitution is published, unifying the legal systems of the East and West Banks and guaranteeing equality.",
    storyElements: [
        {
            text: "Jordan publishes a new constitution for the unified kingdom.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Jordan publishes a new constitution for the unified kingdom.",
                "A new constitution for the unified kingdom is published by Jordan.",
                "The publication of a new constitution for the unified kingdom occurs in Jordan.",
                "A new constitution is issued by Jordan for the unified state.",
            ],
        },
        {
            text: "It annuls the previous Jordanian Constitution (1946) and the Palestine Order in Council (1922).",
            category: "annulment",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It annuls the previous Jordanian Constitution (1946) and the Palestine Order in Council (1922).",
                "The 1946 Jordanian Constitution and the 1922 Palestine Order in Council are nullified by it.",
                "It cancels the previous Jordanian Constitution of 1946 and the Palestine Order in Council of 1922.",
                "The former Jordanian Constitution (1946) and the Palestine Order in Council (1922) are repealed by it.",
            ],
        },
        {
            text: "Article 6 stipulates equality before the law without discrimination based on race, language or religion.",
            category: "provision",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Article 6 stipulates equality before the law without discrimination based on race, language or religion.",
                "Equality before the law, without discrimination, is stipulated in Article 6.",
                "Article 6 guarantees that all are equal before the law, regardless of race, language or religion.",
                "No discrimination on the basis of race, language or religion is allowed, as per Article 6.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which annuls", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "and stipulates", color: "#a1c4fd" },
    ],
    tags: ["Legal"],
    actors: ["Jordan Governmental"],
    locations: ["Jordan"],
    related_places: [],
    dateOptions: [
        "8 January 1952",
        "11 August 1952",
        "24 April 1950",
        "8 January 1951",
    ],
    locationOptions: [
        "Jordan",
        "Amman",
        "West Bank",
        "East Bank",
    ],
    outcomeOptions: [
        "A new constitution is published, unifying the legal systems of the East and West Banks and guaranteeing equality.",
        "The publication of a new constitution unifies the legal frameworks of the two banks and ensures equality.",
        "A unified legal system for both banks and a guarantee of equality are established in a new constitution.",
        "By publishing a new constitution, the legal systems of the East and West Banks are unified and equality is guaranteed.",
    ],
  },

  //event26

  // Add this event object to your 'events.ts' file

{
    title: "UNGA 512 (VI): UNCCP to Continue its Efforts",
    date: "26 January 1952",
    location: "New York, USA",
    outcome: "The UN regrets the UNCCP's lack of success but requests it to continue its efforts and reporting.",
    storyElements: [
        {
            text: "The resolution notes with regret that the UNCCP 'has been unable to fulfill its mandate.'",
            category: "finding",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The resolution notes with regret that the UNCCP 'has been unable to fulfill its mandate.'",
                "It is noted with regret in the resolution that the UNCCP has failed to fulfill its mandate.",
                "The UNCCP's inability to fulfill its mandate is noted with regret in the resolution.",
                "The resolution expresses regret that the UNCCP could not complete its mandated task.",
            ],
        },
        {
            text: "It urges the concerned governments 'to seek agreement' in conformity with UN resolutions.",
            category: "call_to_action",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "It urges the concerned governments 'to seek agreement' in conformity with UN resolutions.",
                "The governments involved are urged to 'seek agreement' that aligns with UN resolutions.",
                "A call is made for the concerned governments to find an agreement based on UN resolutions.",
                "The resolution pushes the relevant governments to 'seek agreement' as per UN resolutions.",
            ],
        },
        {
            text: "It requests the UNCCP to continue its efforts and render progress reports periodically.",
            category: "directive",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It requests the UNCCP to continue its efforts and render progress reports periodically.",
                "The UNCCP is requested to keep trying and provide regular progress reports.",
                "A request is made for the UNCCP to continue its work and submit periodic progress reports.",
                "The resolution asks the UNCCP to persist in its efforts and report on its progress from time to time.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "and urges", color: "#c3cfe2" },
      { from: 0, to: 2, relationship: "but requests", color: "#c3cfe2" },
    ],
    tags: ["Diplomatic"],
    actors: ["UN Inter-Governmental"],
    locations: [],
    related_places: [],
    dateOptions: [
        "26 January 1952",
        "8 January 1952",
        "14 December 1950",
        "26 January 1951",
    ],
    locationOptions: [
        "New York, USA",
        "Jerusalem",
        "Geneva, Switzerland",
        "London, Great Britain",
    ],
    outcomeOptions: [
        "The UN regrets the UNCCP's lack of success but requests it to continue its efforts and reporting.",
        "Despite regretting the UNCCP's failure, the UN asks it to continue its work and reporting.",
        "The UNCCP is requested to continue its efforts and reporting, though its lack of success is regretted.",
        "A UN resolution notes the UNCCP's lack of success with regret but asks it to carry on its work and reporting.",
    ],
  },

  //event27

  // Add this event object to your 'events.ts' file

{
    title: "UNGA 513 (VI): UNRWA to Carry Refugee Relief and Reintegration for 3 Years",
    date: "26 January 1952",
    location: "New York, USA",
    outcome: "The UN endorses a 3-year UNRWA program and asks the agency to explore transferring relief administration to host governments.",
    storyElements: [
        {
            text: "The resolution endorses the UNRWA program for relief and reintegration of Palestine refugees.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The resolution endorses the UNRWA program for relief and reintegration of Palestine refugees.",
                "The UNRWA program for refugee relief and reintegration is endorsed by the resolution.",
                "Endorsement is given by the resolution to the UNRWA program for refugee relief and reintegration.",
                "The UNRWA program for the relief and reintegration of refugees gets the resolution's approval.",
            ],
        },
        {
            text: "The program is to be carried out over a period of approximately three years.",
            category: "timeline",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The program is to be carried out over a period of approximately three years.",
                "A timeline of about three years is set for the program's implementation.",
                "The program's duration is planned for roughly three years.",
                "It is a three-year program for the relief and reintegration of refugees.",
            ],
        },
        {
            text: "It requests UNRWA to explore transferring the administration of relief to host governments.",
            category: "directive",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It requests UNRWA to explore transferring the administration of relief to host governments.",
                "UNRWA is asked to investigate the possibility of transferring relief administration to host governments.",
                "A request is made for UNRWA to look into handing over relief administration to host governments.",
                "The resolution asks UNRWA to explore giving control of relief administration to host governments.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "with a", color: "#c3cfe2" },
      { from: 0, to: 2, relationship: "and requests", color: "#c3cfe2" },
    ],
    tags: ["Diplomatic"],
    actors: ["UN Inter-Governmental"],
    locations: [],
    related_places: [],
    dateOptions: [
        "26 January 1952",
        "8 January 1952",
        "14 December 1950",
        "26 January 1951",
    ],
    locationOptions: [
        "New York, USA",
        "Jerusalem",
        "Geneva, Switzerland",
        "Amman, Jordan",
    ],
    outcomeOptions: [
        "The UN endorses a 3-year UNRWA program and asks the agency to explore transferring relief administration to host governments.",
        "A 3-year UNRWA program is endorsed by the UN, which also asks the agency to investigate transferring relief administration.",
        "The UN gives its backing to a 3-year UNRWA program and requests the agency to explore handing over relief administration.",
        "Endorsement for a 3-year UNRWA program is given by the UN, with a request to explore transferring relief administration.",
    ],
  },

  //event28

  // Add this event object to your 'events.ts' file

{
    title: "The Knesset Enacts the Nationality Law",
    date: "1 April 1952",
    location: "Israel",
    outcome: "A nationality law is enacted, granting automatic citizenship to Jews under the Law of Return and setting strict residency conditions for Arabs.",
    storyElements: [
        {
            text: "The Knesset passes the Nationality Law of 1952.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 80, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The Knesset passes the Nationality Law of 1952.",
                "The 1952 Nationality Law is passed by the Knesset.",
                "Enactment of the 1952 Nationality Law is done by the Knesset.",
                "The Knesset approves the Nationality Law of 1952.",
            ],
        },
        {
            text: "Citizenship is acquired by return, residence, birth, or naturalization.",
            category: "method",
            position: { x: 100, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Citizenship is acquired by return, residence, birth, or naturalization.",
                "The ways to acquire citizenship are return, residence, birth, or naturalization.",
                "One can gain citizenship through return, residence, birth, or naturalization.",
                "Return, residence, birth, or naturalization are the methods for acquiring citizenship.",
            ],
        },
        {
            text: "Every 'oleh' under the Law of Return is automatically considered an Israeli citizen.",
            category: "provision",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Every 'oleh' under the Law of Return is automatically considered an Israeli citizen.",
                "An Israeli citizen is automatically any 'oleh' according to the Law of Return.",
                "All 'olim' under the Law of Return are granted automatic Israeli citizenship.",
                "Automatic Israeli citizenship is given to every 'oleh' under the Law of Return.",
            ],
        },
        {
            text: "Arab Palestinians must fulfill several strict conditions to gain citizenship through residence.",
            category: "condition",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Arab Palestinians must fulfill several strict conditions to gain citizenship through residence.",
                "To get citizenship by residence, Arab Palestinians have to meet a number of strict conditions.",
                "Strict conditions must be fulfilled by Arab Palestinians for citizenship by residence.",
                "The path to citizenship by residence for Arab Palestinians has several strict requirements.",
            ],
        },
        {
            text: "The law repeals the previous Palestinian Citizenship Orders of 1925-1942.",
            category: "annulment",
            position: { x: 700, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", 
                color: "#333", 
                width: 240, 
                height: 90, 
                edgeColor: "#66a6ff" 
            },
            options: [
                "The law repeals the previous Palestinian Citizenship Orders of 1925-1942.",
                "The Palestinian Citizenship Orders of 1925-1942 are repealed by the new law.",
                "A repeal of the 1925-1942 Palestinian Citizenship Orders is part of the new law.",
                "The former Palestinian Citizenship Orders from 1925-1942 are cancelled by this law.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which outlines", color: "#a1c4fd" },
      { from: 1, to: 2, relationship: "whereby return gives", color: "#d299c2" },
      { from: 1, to: 3, relationship: "while residence sets", color: "#d299c2" },
      { from: 0, to: 4, relationship: "and repeals", color: "#a1c4fd" },
    ],
    tags: ["Legal"],
    actors: ["Israel Governmental"],
    locations: ["Israel"],
    related_places: [],
    dateOptions: [
        "1 April 1952",
        "5 July 1950",
        "14 July 1952",
        "1 April 1951",
    ],
    locationOptions: [
        "Israel",
        "Jerusalem",
        "Tel Aviv",
        "The West Bank",
    ],
    outcomeOptions: [
        "A nationality law is enacted, granting automatic citizenship to Jews under the Law of Return and setting strict residency conditions for Arabs.",
        "A new law on nationality gives automatic citizenship to Jews via the Law of Return, with strict residence rules for Arabs.",
        "Automatic citizenship for Jews under the Law of Return and strict residence criteria for Arabs are established in a new nationality law.",
        "The enactment of a nationality law results in automatic citizenship for Jews (Law of Return) and strict residency conditions for Arabs.",
    ],
  },

  //event29

  // Add this event object to your 'events.ts' file

{
    title: "Palestinians in Israel Protest the Nationality Law",
    date: "14 July 1952",
    location: "Israel",
    outcome: "A campaign of protests, including a work stoppage, is launched against the Nationality Law, though many remain stateless.",
    storyElements: [
        {
            text: "Palestinian and Jewish activists launch a campaign against the Nationality Law.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Palestinian and Jewish activists launch a campaign against the Nationality Law.",
                "A campaign against the Nationality Law is launched by Palestinian and Jewish activists.",
                "Activists from both Palestinian and Jewish communities begin a campaign against the Nationality Law.",
                "The launch of a campaign against the Nationality Law is initiated by Palestinian and Jewish activists.",
            ],
        },
        {
            text: "They protest the naturalization requirement for Arabs who do not fulfill the residence conditions.",
            category: "focus",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "They protest the naturalization requirement for Arabs who do not fulfill the residence conditions.",
                "The protest focuses on the naturalization requirement for Arabs who fail to meet residency conditions.",
                "Their main objection is the naturalization application needed by Arabs not meeting the residency rules.",
                "A key point of protest is the requirement for Arabs to apply for naturalization if they don't meet residence criteria.",
            ],
        },
        {
            text: "Activists hold meetings in villages and towns to explain the new law.",
            category: "tactic",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Activists hold meetings in villages and towns to explain the new law.",
                "Meetings are held by activists in many villages and towns to explain the law's implications.",
                "To explain the new law, activists organize meetings across dozens of villages and towns.",
                "The holding of meetings in numerous villages and towns is done by activists to explain the law.",
            ],
        },
        {
            text: "They organize a half-day work stoppage on 14 July.",
            category: "tactic",
            position: { x: 150, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", 
                color: "#333", 
                width: 240, 
                height: 80, 
                edgeColor: "#66a6ff" 
            },
            options: [
                "They organize a half-day work stoppage on 14 July.",
                "A half-day strike is organized on 14 July.",
                "On 14 July, a half-day work stoppage is organized by activists.",
                "The organization of a half-day work stoppage occurs on 14 July.",
            ],
        },
        {
            text: "An estimated 60,000 Palestinians in Israel will still be considered stateless at the end of the 1960s.",
            category: "consequence",
            position: { x: 650, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "An estimated 60,000 Palestinians in Israel will still be considered stateless at the end of the 1960s.",
                "At the end of the 1960s, about 60,000 Palestinians in Israel are expected to remain stateless.",
                "It is estimated that by the late 1960s, 60,000 Palestinians in Israel would be without citizenship.",
                "The statelessness of an estimated 60,000 Palestinians in Israel would continue through the 1960s.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which protests", color: "#c3cfe2" },
      { from: 0, to: 2, relationship: "by holding", color: "#c3cfe2" },
      { from: 0, to: 3, relationship: "and organizing", color: "#c3cfe2" },
      { from: 0, to: 4, relationship: "despite which", color: "#c3cfe2" },
    ],
    tags: ["Popular action", "Legal"],
    actors: ["Palestine Non-Governmental", "Israel Governmental"],
    locations: ["Israel"],
    related_places: [],
    dateOptions: [
        "14 July 1952",
        "1 April 1952",
        "1 March 1952",
        "29 July 1980",
    ],
    locationOptions: [
        "Israel",
        "Jerusalem",
        "Tel Aviv",
        "Haifa",
    ],
    outcomeOptions: [
        "A campaign of protests, including a work stoppage, is launched against the Nationality Law, though many remain stateless.",
        "Protests against the Nationality Law, including a strike, are held, but many Palestinians remain without citizenship.",
        "Despite a protest campaign and work stoppage against the Nationality Law, a large number of Palestinians are left stateless.",
        "A campaign featuring a work stoppage protests the Nationality Law, yet many Palestinians continue to be stateless.",
    ],
  },

  //event30
  
  // Add this event object to your 'events.ts' file

{
    title: "The Egyptian Revolution of 1952",
    date: "23 July 1952",
    location: "Egypt",
    outcome: "The Egyptian monarchy is overthrown by the Free Officers movement, leading to the rise of Gamal Abdel Nasser.",
    storyElements: [
        {
            text: "The Egyptian monarchy of King Faruq is overthrown by the Free Officers movement.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The Egyptian monarchy of King Faruq is overthrown by the Free Officers movement.",
                "The Free Officers movement overthrows the monarchy of Egypt's King Faruq.",
                "King Faruq's monarchy in Egypt is toppled by the Free Officers movement.",
                "An overthrow of the Egyptian monarchy of King Faruq is carried out by the Free Officers.",
            ],
        },
        {
            text: "The Free Officers movement is headed by Muhammad Naguib and Gamal Abdel Nasser.",
            category: "leadership",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The Free Officers movement is headed by Muhammad Naguib and Gamal Abdel Nasser.",
                "Muhammad Naguib and Gamal Abdel Nasser are the heads of the Free Officers movement.",
                "The leadership of the Free Officers movement includes Muhammad Naguib and Gamal Abdel Nasser.",
                "The Free Officers movement is led by two main figures, Muhammad Naguib and Gamal Abdel Nasser.",
            ],
        },
        {
            text: "Nasser quickly rises to power, espousing an Arab nationalist and anti-imperialist policy.",
            category: "consequence",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Nasser quickly rises to power, espousing an Arab nationalist and anti-imperialist policy.",
                "A rapid rise to power by Nasser follows, who promotes an Arab nationalist and anti-imperialist policy.",
                "An Arab nationalist and anti-imperialist policy is championed by Nasser as he quickly gains power.",
                "Nasser's swift ascent to power is marked by his support for an Arab nationalist and anti-imperialist policy.",
            ],
        },
    ],
    storyConnections: [
      { from: 1, to: 0, relationship: "which", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "leading to", color: "#ff9a9e" },
    ],
    tags: ["Contextual"],
    actors: ["Egypt Governmental"],
    locations: ["Egypt"],
    related_places: [],
    dateOptions: [
        "23 July 1952",
        "11 August 1952",
        "1 September 1951",
        "23 July 1951",
    ],
    locationOptions: [
        "Egypt",
        "Cairo",
        "Suez Canal",
        "Jordan",
    ],
    outcomeOptions: [
        "The Egyptian monarchy is overthrown by the Free Officers movement, leading to the rise of Gamal Abdel Nasser.",
        "The overthrow of the monarchy by the Free Officers results in Gamal Abdel Nasser's rise to power.",
        "Gamal Abdel Nasser rises to power following the overthrow of the Egyptian monarchy by the Free Officers.",
        "The Free Officers movement topples the monarchy, which paves the way for Gamal Abdel Nasser's ascent.",
    ],
  },

  //event31
  // Add this event object to your 'events.ts' file

{
    title: "The Knesset Adopts the Entry into Israel Law",
    date: "26 August 1952",
    location: "Israel",
    outcome: "A regular law is adopted to deport anyone entering Israel without a permit, though it proves insufficient to stop Palestinian return attempts.",
    storyElements: [
        {
            text: "The law is the first regular instrument to deport people entering Israel without a permit.",
            category: "purpose",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The law is the first regular instrument to deport people entering Israel without a permit.",
                "It is the first standard law, not an emergency regulation, for deporting those who enter Israel without a permit.",
                "This is the first non-emergency law created to deport individuals entering Israel without a permit.",
                "The first regular legal tool for deporting people who enter Israel without a permit is this law.",
            ],
        },
        {
            text: "It does not distinguish between foreigners and potential Palestinian 'returnees.'",
            category: "scope",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "It does not distinguish between foreigners and potential Palestinian 'returnees.'",
                "No distinction is made in the law between foreigners and Palestinians seeking to return.",
                "The law applies equally to foreigners and potential Palestinian 'returnees' without distinction.",
                "There is no differentiation in the law between foreign nationals and Palestinians who might return.",
            ],
        },
        {
            text: "The term 'infiltration' is not used in the law.",
            category: "detail",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The term 'infiltration' is not used in the law.",
                "In the law, the word 'infiltration' does not appear.",
                "The law avoids using the term 'infiltration'.",
                "Use of the word 'infiltration' is absent from the law's text.",
            ],
        },
        {
            text: "The law will prove insufficient and will be followed by the 1954 Prevention of Infiltration Law.",
            category: "consequence",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The law will prove insufficient and will be followed by the 1954 Prevention of Infiltration Law.",
                "It will turn out to be an insufficient law, leading to the 1954 Prevention of Infiltration Law.",
                "The law's insufficiency will lead to the creation of the 1954 Prevention of Infiltration Law.",
                "Later, the 1954 Prevention of Infiltration Law will be passed because this law was not sufficient.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which", color: "#c3cfe2" },
      { from: 0, to: 2, relationship: "and where", color: "#c3cfe2" },
      { from: 0, to: 3, relationship: "however,", color: "#c3cfe2" },
    ],
    tags: ["Legal", "Sanctions"],
    actors: ["Israel Governmental"],
    locations: ["Israel"],
    related_places: [],
    dateOptions: [
        "26 August 1952",
        "14 July 1952",
        "23 July 1952",
        "26 August 1954",
    ],
    locationOptions: [
        "Israel",
        "Tel Aviv",
        "Jerusalem",
        "The West Bank",
    ],
    outcomeOptions: [
        "A regular law is adopted to deport anyone entering Israel without a permit, though it proves insufficient to stop Palestinian return attempts.",
        "An insufficient law is passed to deport people entering Israel without a permit, which is later replaced.",
        "The first standard law for deporting those entering Israel without a permit is passed, but it is not effective enough.",
        "A law is enacted to deport people who enter Israel without a permit, but it is found to be inadequate.",
    ],
  },

  //event32

  // Add this event object to your 'events.ts' file

{
    title: "The Zionist Organization/Jewish Agency Status Law",
    date: "24 November 1952",
    location: "Israel",
    outcome: "A law is enacted recognizing the Zionist Organization as the authorized agency for settlement and immigrant absorption.",
    storyElements: [
        {
            text: "The Knesset enacts the Zionist Organization/Jewish Agency Status Law.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The Knesset enacts the Zionist Organization/Jewish Agency Status Law.",
                "The Zionist Organization/Jewish Agency Status Law is enacted by the Knesset.",
                "Enactment of the Zionist Organization/Jewish Agency Status Law is carried out by the Knesset.",
                "The Knesset passes the Zionist Organization/Jewish Agency Status Law into effect.",
            ],
        },
        {
            text: "It recognizes the Zionist Organization as the 'authorized agency' for settlement and absorption.",
            category: "recognition",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It recognizes the Zionist Organization as the 'authorized agency' for settlement and absorption.",
                "The Zionist Organization is recognized as the 'authorized agency' for settlement and immigrant absorption.",
                "Recognition is given to the Zionist Organization as the 'authorized agency' for settling the country.",
                "The law designates the Zionist Organization as the 'authorized agency' for absorption and settlement.",
            ],
        },
        {
            text: "The law authorizes the organization to enter into a 'Covenant' with the government.",
            category: "authorization",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The law authorizes the organization to enter into a 'Covenant' with the government.",
                "Authorization is given by the law for the organization to make a 'Covenant' with the government.",
                "The organization is empowered by the law to sign a 'Covenant' with the government.",
                "The ability for the organization to enter into a 'Covenant' with the government is authorized by the law.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which recognizes", color: "#a1c4fd" },
      { from: 1, to: 2, relationship: "and authorizes", color: "#d299c2" },
    ],
    tags: ["Institutional", "Legal"],
    actors: ["Zionists Governmental", "Zionists Quasi-Governmental"],
    locations: ["Israel"],
    related_places: [],
    dateOptions: [
        "24 November 1952",
        "14 August 1951",
        "24 November 1954",
        "26 August 1952",
    ],
    locationOptions: [
        "Israel",
        "Jerusalem",
        "Tel Aviv",
        "The West Bank",
    ],
    outcomeOptions: [
        "A law is enacted recognizing the Zionist Organization as the authorized agency for settlement and immigrant absorption.",
        "The Zionist Organization is recognized as the official agency for settlement and absorption by a new law.",
        "A new law makes the Zionist Organization the authorized body for settling the country and absorbing immigrants.",
        "By law, the Zionist Organization is designated the authorized agency for settlement and immigrant absorption.",
    ],
  },

  //event33

  // Add this event object to your 'events.ts' file

{
    title: "Israeli Operation in Jordan",
    date: "28 January 1953",
    location: "Falamia, West Bank",
    outcome: "An Israeli force attacks the village of Falamia, killing eleven residents.",
    storyElements: [
        {
            text: "An Israeli force of over 150 men launches an attack on the village of Falamia.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "An Israeli force of over 150 men launches an attack on the village of Falamia.",
                "The village of Falamia is attacked by an Israeli force numbering over 150 men.",
                "Over 150 Israeli soldiers carry out an attack on the village of Falamia.",
                "An attack on Falamia village is launched by an Israeli force of more than 150 men.",
            ],
        },
        {
            text: "The village is located near Tulkarm.",
            category: "location",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The village is located near Tulkarm.",
                "Near Tulkarm is where the village is located.",
                "The location of the village is close to Tulkarm.",
                "The village is situated in the vicinity of Tulkarm.",
            ],
        },
        {
            text: "Eleven residents are killed in the attack.",
            category: "consequence",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Eleven residents are killed in the attack.",
                "The attack results in the deaths of eleven residents.",
                "In the attack, eleven of the village's residents are killed.",
                "There are eleven residents killed as a result of the attack.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "located", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "resulting in", color: "#ff9a9e" },
    ],
    tags: ["Violence"],
    actors: ["Israel Governmental", "Palestine Non-Governmental", "Jordan Non-Governmental"],
    locations: ["Jordan", "West Bank"],
    related_places: [],
    dateOptions: [
        "28 January 1953",
        "26 January 1952",
        "28 February 1953",
        "28 January 1952",
    ],
    locationOptions: [
        "Falamia, West Bank",
        "Tulkarm, West Bank",
        "Jerusalem",
        "Amman, Jordan",
    ],
    outcomeOptions: [
        "An Israeli force attacks the village of Falamia, killing eleven residents.",
        "The attack on Falamia by an Israeli force leads to the death of eleven residents.",
        "Eleven residents are killed when an Israeli force conducts an attack on the village of Falamia.",
        "The result of an Israeli attack on Falamia is the death of eleven of its residents.",
    ],
  },

  //event34

  // Add this event object to your 'events.ts' file

{
    title: "Land Acquisition (Validation of Acts and Compensation) Law",
    date: "10 March 1953",
    location: "Israel",
    outcome: "Retroactively legalizes seizures of land not in its owner's possession by April 1952, transferring it to the Development Authority.",
    storyElements: [
        {
            text: "This legislation aims at retroactively legalizing land seizures made without a legal basis.",
            category: "purpose",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "This legislation aims at retroactively legalizing land seizures made without a legal basis.",
                "The goal of this law is to retroactively make legal the land seizures that had no legal foundation.",
                "The aim of this legislation is to give retroactive legality to seizures of land done without legal cause.",
                "This law is intended to legalize, after the fact, land seizures that were carried out without a legal basis.",
            ],
        },
        {
            text: "Expropriation is valid if the land was not in its owner’s possession on 1 April 1952.",
            category: "condition",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Expropriation is valid if the land was not in its owner’s possession on 1 April 1952.",
                "If the owner was not in possession of the land on 1 April 1952, the expropriation is valid.",
                "The validity of the expropriation depends on the land not being in the owner's possession on 1 April 1952.",
                "The law validates expropriation for land that was out of its owner's possession on 1 April 1952.",
            ],
        },
        {
            text: "The land must have been used for essential development, settlement, or security purposes.",
            category: "condition",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The land must have been used for essential development, settlement, or security purposes.",
                "Use for essential development, settlement, or security is a requirement for the land.",
                "A condition is that the land was used for key development, settlement, or security reasons.",
                "The land's usage for essential development, settlement, or security purposes is mandatory.",
            ],
        },
        {
            text: "The expropriated land is placed under the control of the Development Authority.",
            category: "mechanism",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The expropriated land is placed under the control of the Development Authority.",
                "Control of the expropriated land is given to the Development Authority.",
                "The Development Authority is given control over the expropriated land.",
                "The land that is expropriated falls under the control of the Development Authority.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "applies if", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "and if", color: "#a1c4fd" },
      { from: 1, to: 3, relationship: "then land is given to", color: "#a1c4fd" },
    ],
    tags: ["Legal", "Colonization"],
    actors: ["Israel Governmental"],
    locations: ["Israel"],
    related_places: [],
    dateOptions: [
        "10 March 1953",
        "1 April 1952",
        "14 May 1948",
        "10 March 1952",
    ],
    locationOptions: [
        "Israel",
        "Jerusalem",
        "Tel Aviv",
        "The West Bank",
    ],
    outcomeOptions: [
        "Retroactively legalizes seizures of land not in its owner's possession by April 1952, transferring it to the Development Authority.",
        "The law legalizes past seizures of land if the owner was not in possession by April 1952, giving it to the Development Authority.",
        "Land seizures are retroactively legalized for land not in the owner's possession by April 1952, with control going to the Development Authority.",
        "A law is passed to legalize prior land seizures if the owner was not in possession by April 1952, and transfers it to the Development Authority.",
    ],
  },

  //event35

  // Add this event object to your 'events.ts' file

{
    title: "King Hussein’s Formal Accession to the Throne",
    date: "2 May 1953",
    location: "Jordan",
    outcome: "Having come of age, Hussein bin Talal formally becomes King of Jordan.",
    storyElements: [
        {
            text: "Having reached the age of 18, Hussein bin Talal accedes to the Hashemite throne.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Having reached the age of 18, Hussein bin Talal accedes to the Hashemite throne.",
                "Hussein bin Talal ascends to the Hashemite throne upon reaching the age of 18.",
                "At the age of 18, Hussein bin Talal formally takes the Hashemite throne.",
                "The accession of Hussein bin Talal to the Hashemite throne occurs when he turns 18.",
            ],
        },
        {
            text: "He assumes his constitutional powers.",
            category: "consequence",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "He assumes his constitutional powers.",
                "His constitutional powers are formally assumed by him.",
                "The assumption of his constitutional powers takes place.",
                "He formally takes on his powers as defined by the constitution.",
            ],
        },
        {
            text: "He had been proclaimed King on 11 August 1952.",
            category: "context",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "He had been proclaimed King on 11 August 1952.",
                "The proclamation of him as King occurred on 11 August 1952.",
                "On 11 August 1952, he was formally proclaimed King.",
                "His proclamation as King dates back to 11 August 1952.",
            ],
        },
        {
            text: "The interim period was assured by a Regency Council.",
            category: "context",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 260, 
                height: 80, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The interim period was assured by a Regency Council.",
                "A Regency Council managed the interim period.",
                "During the interim, a Regency Council was in charge.",
                "The time in between was overseen by a Regency Council.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "and", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "fulfilling the", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "which necessitated an", color: "#f5f7fa" },
    ],
    tags: ["Biographical"],
    actors: ["Jordan Governmental"],
    locations: ["Jordan"],
    related_places: [],
    dateOptions: [
        "2 May 1953",
        "11 August 1952",
        "20 July 1951",
        "2 May 1952",
    ],
    locationOptions: [
        "Jordan",
        "Amman",
        "Jerusalem",
        "The West Bank",
    ],
    outcomeOptions: [
        "Having come of age, Hussein bin Talal formally becomes King of Jordan.",
        "Hussein bin Talal formally takes the throne of Jordan upon reaching adulthood.",
        "The formal accession of Hussein bin Talal to the Jordanian throne occurs as he comes of age.",
        "When he comes of age, Hussein bin Talal's formal assumption of the Jordanian throne takes place.",
    ],
  },
  //event36

  // Add this event object to your 'events.ts' file

{
    title: "Israel's Foreign Ministry Moves to Jerusalem",
    date: "10 July 1953 - 12 July 1953",
    location: "Jerusalem",
    outcome: "The Israeli Foreign Ministry moves to Jerusalem, asserting the city as Israel's capital.",
    storyElements: [
        {
            text: "The Foreign Ministry informs foreign embassies that it will move its offices to Jerusalem.",
            category: "announcement",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The Foreign Ministry informs foreign embassies that it will move its offices to Jerusalem.",
                "Foreign embassies are informed by the Foreign Ministry of its impending move to Jerusalem.",
                "An announcement is made to foreign embassies that the Foreign Ministry will relocate to Jerusalem.",
                "The Foreign Ministry notifies foreign embassies about the transfer of its offices to Jerusalem.",
            ],
        },
        {
            text: "The move is from Tel Aviv to Jerusalem.",
            category: "relocation",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The move is from Tel Aviv to Jerusalem.",
                "From Tel Aviv, the ministry relocates to Jerusalem.",
                "The relocation takes the ministry from Tel Aviv to Jerusalem.",
                "Jerusalem becomes the new location for the ministry, which moves from Tel Aviv.",
            ],
        },
        {
            text: "This move asserts Jerusalem as Israel's capital.",
            category: "goal",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "This move asserts Jerusalem as Israel's capital.",
                "The assertion of Jerusalem as Israel's capital is made through this move.",
                "By moving, the ministry asserts that Jerusalem is the capital of Israel.",
                "Jerusalem's status as the capital of Israel is asserted by this move.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "detailing the", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "thereby", color: "#a1c4fd" },
    ],
    tags: ["Institutional"],
    actors: ["Israel Governmental"],
    locations: ["Israel", "Jerusalem"],
    related_places: [],
    dateOptions: [
        "10 July 1953 - 12 July 1953",
        "13 July 1953",
        "2 May 1953",
        "10 June 1953 - 12 June 1953",
    ],
    locationOptions: [
        "Jerusalem",
        "Tel Aviv",
        "Haifa",
        "The West Bank",
    ],
    outcomeOptions: [
        "The Israeli Foreign Ministry moves to Jerusalem, asserting the city as Israel's capital.",
        "By moving to Jerusalem, the Israeli Foreign Ministry asserts the city as the nation's capital.",
        "The assertion of Jerusalem as Israel's capital is made by the Foreign Ministry's move there.",
        "Israel's Foreign Ministry relocates to Jerusalem, an act which asserts the city as the capital.",
    ],
  },
  //event37

  // Add this event object to your 'events.ts' file

{
    title: "The Knesset Adopts the Law of State Education",
    date: "12 August 1953",
    location: "Israel",
    outcome: "A law is adopted defining the aims of the education system for Jewish pupils, ignoring goals for Arab students.",
    storyElements: [
        {
            text: "The law bases education on Jewish culture, science, and loyalty to the state and Jewish people.",
            category: "aims",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The law bases education on Jewish culture, science, and loyalty to the state and Jewish people.",
                "Education is to be based on Jewish culture, science, and loyalty to the state and Jewish people.",
                "The foundation of education is defined as Jewish culture, science, and loyalty to the state and Jewish people.",
                "Loyalty to the state, Jewish culture, and science are the cornerstones of education under this law.",
            ],
        },
        {
            text: "It also includes aims like agricultural work, pioneer training, and universal values.",
            category: "aims",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "It also includes aims like agricultural work, pioneer training, and universal values.",
                "Aims such as agricultural work, pioneer training, and universal values are also included.",
                "Agricultural work, pioneer training, and universal values are other stated aims of the law.",
                "The law's objectives also encompass agricultural work, pioneer training, and universal values.",
            ],
        },
        {
            text: "The aims of the education system are addressed primarily to Jewish pupils.",
            category: "focus",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The aims of the education system are addressed primarily to Jewish pupils.",
                "Jewish pupils are the primary audience for the education system's aims.",
                "The focus of the educational aims is mainly on Jewish students.",
                "The system's educational goals are directed principally at Jewish pupils.",
            ],
        },
        {
            text: "The law completely ignores the educational goals for Arab students in public schools.",
            category: "omission",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The law completely ignores the educational goals for Arab students in public schools.",
                "Educational goals for Arab students in public schools are totally ignored by the law.",
                "The law makes no mention of educational goals for Arab students in public schools.",
                "A complete omission of educational goals for Arab students in public schools exists in the law.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "and also", color: "#c3cfe2" },
      { from: 0, to: 2, relationship: "which are for", color: "#c3cfe2" },
      { from: 2, to: 3, relationship: "while it", color: "#d299c2" },
    ],
    tags: ["Legal", "Social-Economic"],
    actors: ["Israel Governmental"],
    locations: ["Israel"],
    related_places: [],
    dateOptions: [
        "12 August 1953",
        "10 July 1953",
        "12 August 2000",
        "12 February 2000",
    ],
    locationOptions: [
        "Israel",
        "Jerusalem",
        "Tel Aviv",
        "Haifa",
    ],
    outcomeOptions: [
        "A law is adopted defining the aims of the education system for Jewish pupils, ignoring goals for Arab students.",
        "The adoption of a law defines educational aims for Jewish students but overlooks those for Arab students.",
        "A new law outlines educational goals for Jewish students while completely ignoring those for Arab students.",
        "The education system's aims for Jewish pupils are defined in a new law that omits goals for Arab students.",
    ],
  },

  //event38

  // Add this event object to your 'events.ts' file

{
    title: "Israeli Operation in Gaza",
    date: "28 August 1953",
    location: "Al-Bureij, Gaza Strip",
    outcome: "An Israeli unit under Ariel Sharon attacks al-Bureij refugee camp, killing at least 50 Palestinians.",
    storyElements: [
        {
            text: "An Israeli unit led by Ariel Sharon attacks al-Bureij refugee camp in Gaza.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "An Israeli unit led by Ariel Sharon attacks al-Bureij refugee camp in Gaza.",
                "Al-Bureij refugee camp in Gaza is attacked by an Israeli unit under Ariel Sharon's command.",
                "An attack on the al-Bureij refugee camp in Gaza is carried out by an Israeli unit led by Ariel Sharon.",
                "The Israeli unit commanded by Ariel Sharon launches an attack on the al-Bureij refugee camp.",
            ],
        },
        {
            text: "The attack kills at least 50 Palestinians.",
            category: "consequence",
            position: { x: 400, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The attack kills at least 50 Palestinians.",
                "At least 50 Palestinians are killed as a result of the attack.",
                "The death toll from the attack is a minimum of 50 Palestinians.",
                "A minimum of 50 Palestinians are killed in the attack.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "resulting in", color: "#ff9a9e" },
    ],
    tags: ["Violence"],
    actors: ["Israel Governmental", "Palestine Non-Governmental"],
    locations: ["Gaza Strip"],
    related_places: [],
    dateOptions: [
        "28 August 1953",
        "12 August 1953",
        "28 July 1953",
        "28 August 1952",
    ],
    locationOptions: [
        "Al-Bureij, Gaza Strip",
        "Gaza City, Gaza Strip",
        "Rafah, Gaza Strip",
        "Khan Yunis, Gaza Strip",
    ],
    outcomeOptions: [
        "An Israeli unit under Ariel Sharon attacks al-Bureij refugee camp, killing at least 50 Palestinians.",
        "The attack on al-Bureij refugee camp by Ariel Sharon's unit results in at least 50 Palestinian deaths.",
        "At least 50 Palestinians are killed when an Israeli unit led by Ariel Sharon attacks al-Bureij refugee camp.",
        "The death of at least 50 Palestinians occurs after an Israeli unit commanded by Ariel Sharon attacks al-Bureij.",
    ],
  },

  //event39

  // Add this event object to your 'events.ts' file

{
    title: "Israel's Construction of the 'National Water Carrier'",
    date: "2 September 1953",
    location: "Israel",
    outcome: "Israel begins a major water diversion project, but fire fights with Syria force a change in the original plan.",
    storyElements: [
        {
            text: "Israel begins construction on a project to divert water from the Jordan River.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Israel begins construction on a project to divert water from the Jordan River.",
                "Construction starts on an Israeli project to divert Jordan River water.",
                "A project to divert water from the Jordan River is started by Israel.",
                "Israel initiates construction for a project to divert the Jordan River's water.",
            ],
        },
        {
            text: "The goal is to carry water in a pipeline from the north to the center and south of Israel.",
            category: "purpose",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The goal is to carry water in a pipeline from the north to the center and south of Israel.",
                "A pipeline to carry water from north to central and southern Israel is the project's aim.",
                "The project intends to use a pipeline to transport water from the north to Israel's center and south.",
                "The objective is to move water via a pipeline from the north to the central and southern regions of Israel.",
            ],
        },
        {
            text: "Frequent fire fights with Syria lead to a change of the original project.",
            category: "complication",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Frequent fire fights with Syria lead to a change of the original project.",
                "A change in the original project is caused by frequent fire fights with Syria.",
                "The original project is altered due to frequent fire fights with Syria.",
                "Because of frequent fire fights with Syria, the initial project has to be changed.",
            ],
        },
        {
            text: "Water will be pumped from Lake Tiberias instead.",
            category: "resolution",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 260, 
                height: 80, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Water will be pumped from Lake Tiberias instead.",
                "Instead, the plan is to pump water from Lake Tiberias.",
                "The alternative plan is to pump water from Lake Tiberias.",
                "From Lake Tiberias is where water will be pumped as an alternative.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "for the", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "but", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "so", color: "#ff9a9e" },
    ],
    tags: ["Social-Economic"],
    actors: ["Israel Governmental", "Syria Governmental"],
    locations: ["Israel"],
    related_places: [],
    dateOptions: [
        "2 September 1953",
        "28 August 1953",
        "2 October 1953",
        "2 September 1952",
    ],
    locationOptions: [
        "Jordan River",
        "Lake Tiberias",
        "Golan Heights",
        "Tel Aviv",
    ],
    outcomeOptions: [
        "Israel begins a major water diversion project, but fire fights with Syria force a change in the original plan.",
        "A major water project is started by Israel, but the plan is changed due to conflict with Syria.",
        "Due to Syrian fire fights, Israel is forced to change its original plan for a major water diversion project.",
        "The start of a major Israeli water project is followed by a change of plans because of fire fights with Syria.",
    ],
  },

  //event40

  // Add this event object to your 'events.ts' file

{
    title: "Israeli Operation Against Qibya",
    date: "14 October 1953",
    location: "Qibya, West Bank",
    outcome: "Unit 101, commanded by Ariel Sharon, attacks the village of Qibya, killing more than 40 Palestinian civilians.",
    storyElements: [
        {
            text: "Unit 101 of the Israeli army, commanded by Ariel Sharon, attacks the village of Qibya.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Unit 101 of the Israeli army, commanded by Ariel Sharon, attacks the village of Qibya.",
                "The village of Qibya is attacked by Unit 101 of the Israeli army under Ariel Sharon's command.",
                "Ariel Sharon's Unit 101 carries out an attack on the village of Qibya.",
                "An attack on Qibya village is launched by Israeli army Unit 101, led by Ariel Sharon.",
            ],
        },
        {
            text: "The attack kills more than 40 Palestinian civilians.",
            category: "consequence",
            position: { x: 400, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The attack kills more than 40 Palestinian civilians.",
                "More than 40 Palestinian civilians are killed as a result of the attack.",
                "The death toll from the attack exceeds 40 Palestinian civilians.",
                "Over 40 Palestinian civilians are killed in the attack.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "resulting in", color: "#ff9a9e" },
    ],
    tags: ["Violence"],
    actors: ["Israel Governmental", "Palestine Non-Governmental", "Jordan Governmental"],
    locations: ["Jordan", "West Bank"],
    related_places: [],
    dateOptions: [
        "14 October 1953",
        "28 August 1953",
        "14 September 1953",
        "14 October 1952",
    ],
    locationOptions: [
        "Qibya, West Bank",
        "Falamia, West Bank",
        "Jerusalem",
        "Hebron, West Bank",
    ],
    outcomeOptions: [
        "Unit 101, commanded by Ariel Sharon, attacks the village of Qibya, killing more than 40 Palestinian civilians.",
        "The attack on Qibya by Ariel Sharon's Unit 101 results in the deaths of over 40 Palestinian civilians.",
        "More than 40 Palestinian civilians are killed when Unit 101, led by Ariel Sharon, attacks Qibya.",
        "The death of over 40 Palestinian civilians occurs after Israeli Unit 101 under Ariel Sharon attacks Qibya.",
    ],
  },

  //event41
  // Add this event object to your 'events.ts' file

{
    title: "Anti-Israeli Demonstrations in Jordan",
    date: "21 October 1953",
    location: "Jordan",
    outcome: "Widespread demonstrations and a three-hour strike take place across Jordan to protest the Qibya attack.",
    storyElements: [
        {
            text: "Demonstrations take place throughout Jordan.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 80, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Demonstrations take place throughout Jordan.",
                "Across Jordan, demonstrations are held.",
                "Protests occur in various locations throughout Jordan.",
                "The whole of Jordan sees demonstrations taking place.",
            ],
        },
        {
            text: "They occur during a 3-hour strike called by political leaders.",
            category: "context",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "They occur during a 3-hour strike called by political leaders.",
                "The demonstrations coincide with a 3-hour strike organized by political leaders.",
                "A 3-hour strike called by political leaders serves as the backdrop for the demonstrations.",
                "During a 3-hour strike initiated by political leaders, the demonstrations happen.",
            ],
        },
        {
            text: "The protests are a reaction to the Qibya attack.",
            category: "motive",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The protests are a reaction to the Qibya attack.",
                "A reaction to the Qibya attack is what sparked the protests.",
                "The attack on Qibya is the reason for the protests.",
                "In response to the Qibya attack, the protests are held.",
            ],
        },
    ],
    storyConnections: [
      { from: 1, to: 0, relationship: "during which", color: "#d299c2" },
      { from: 2, to: 0, relationship: "motivating", color: "#ff9a9e" },
    ],
    tags: ["Popular action"],
    actors: ["Jordan Non-Governmental"],
    locations: ["Jordan"],
    related_places: [],
    dateOptions: [
        "21 October 1953",
        "14 October 1953",
        "21 September 1953",
        "21 October 1952",
    ],
    locationOptions: [
        "Jordan",
        "Amman",
        "The West Bank",
        "Jerusalem",
    ],
    outcomeOptions: [
        "Widespread demonstrations and a three-hour strike take place across Jordan to protest the Qibya attack.",
        "To protest the Qibya attack, demonstrations and a three-hour strike occur throughout Jordan.",
        "Jordan sees widespread protests and a three-hour strike as a reaction to the Qibya attack.",
        "A three-hour strike and demonstrations happen all over Jordan in protest of the Qibya attack.",
    ],
  },

  //event42
  // Add this event object to your 'events.ts' file

{
    title: "SC Res. 101: Censuring Israel for Its Retaliatory Action in Qibya in Violation of the Israel-Jordan Armistice",
    date: "24 November 1953",
    location: "New York, USA",
    outcome: "The UN censures Israel for the Qibya attack but also requests Jordan to strengthen measures against border crossings.",
    storyElements: [
        {
            text: "Resolution 101 considers Israel's attack on Qibya a violation of the cease-fire.",
            category: "finding",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Resolution 101 considers Israel's attack on Qibya a violation of the cease-fire.",
                "Israel's attack on Qibya is considered a cease-fire violation by Resolution 101.",
                "The attack on Qibya by Israel is deemed a violation of the cease-fire in Resolution 101.",
                "In Resolution 101, the Israeli attack on Qibya is regarded as a violation of the cease-fire.",
            ],
        },
        {
            text: "It expresses the strongest censure of that action.",
            category: "censure",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 80, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "It expresses the strongest censure of that action.",
                "The strongest censure is expressed for that action.",
                "That action receives the strongest possible censure.",
                "A very strong censure of that action is conveyed in the resolution.",
            ],
        },
        {
            text: "However, it notes the crossing of the demarcation line by unauthorized persons.",
            category: "counterpoint",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "However, it notes the crossing of the demarcation line by unauthorized persons.",
                "It does, however, take note of unauthorized crossings of the demarcation line.",
                "The crossing of the demarcation line by unauthorized people is also noted.",
                "Nevertheless, the resolution makes note of unauthorized crossings of the demarcation line.",
            ],
        },
        {
            text: "It requests Jordan to continue and strengthen measures to prevent such crossings.",
            category: "request",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "It requests Jordan to continue and strengthen measures to prevent such crossings.",
                "Jordan is requested to continue and bolster its measures to stop such crossings.",
                "A request is made for Jordan to keep strengthening its measures to prevent these crossings.",
                "The resolution asks Jordan to maintain and reinforce its efforts to prevent such crossings.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "and expresses", color: "#c3cfe2" },
      { from: 0, to: 2, relationship: "however, it also notes", color: "#c3cfe2" },
      { from: 2, to: 3, relationship: "and requests", color: "#d299c2" },
    ],
    tags: ["Diplomatic", "Violence"],
    actors: ["UN Inter-Governmental"],
    locations: [],
    related_places: [],
    dateOptions: [
        "24 November 1953",
        "14 October 1953",
        "21 October 1953",
        "24 November 1952",
    ],
    locationOptions: [
        "New York, USA",
        "Qibya, West Bank",
        "Jerusalem",
        "Amman, Jordan",
    ],
    outcomeOptions: [
        "The UN censures Israel for the Qibya attack but also requests Jordan to strengthen measures against border crossings.",
        "A UN censure is issued against Israel for the Qibya attack, while Jordan is asked to reinforce border control measures.",
        "Israel is censured by the UN for the Qibya attack, but the resolution also asks Jordan to improve its border security.",
        "While censuring Israel for the Qibya attack, the UN also requests that Jordan enhance its measures against border crossings.",
    ],
  },

  //event43

  // Add this event object to your 'events.ts' file

{
    title: "General Islamic Conference on Palestine, Jerusalem",
    date: "3 December 1953 - 9 December 1953",
    location: "Jerusalem",
    outcome: "A General Islamic Conference, led by the Muslim Brotherhood, resolves that the defense of Palestine is a duty for every Muslim.",
    storyElements: [
        {
            text: "The General Islamic Conference holds a 7-day meeting in Jerusalem.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The General Islamic Conference holds a 7-day meeting in Jerusalem.",
                "A 7-day meeting of the General Islamic Conference is held in Jerusalem.",
                "In Jerusalem, the General Islamic Conference convenes for a 7-day meeting.",
                "For 7 days, the General Islamic Conference meets in Jerusalem.",
            ],
        },
        {
            text: "It is an initiative of the Muslim Brotherhood under Said Ramadan.",
            category: "organization",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It is an initiative of the Muslim Brotherhood under Said Ramadan.",
                "The conference is an initiative of the Muslim Brotherhood, guided by Said Ramadan.",
                "Under the leadership of Said Ramadan, the Muslim Brotherhood initiates the conference.",
                "The Muslim Brotherhood, with Said Ramadan as a guide, is the initiator of the conference.",
            ],
        },
        {
            text: "It resolves that the defense of Palestine is the concern of every Muslim.",
            category: "resolution",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "It resolves that the defense of Palestine is the concern of every Muslim.",
                "The conference resolves that every Muslim is concerned with the defense of Palestine.",
                "A resolution is passed stating that the defense of Palestine is a matter for every Muslim.",
                "The defense of Palestine is declared to be the responsibility of every Muslim in a resolution.",
            ],
        },
    ],
    storyConnections: [
      { from: 1, to: 0, relationship: "which holds a", color: "#d299c2" },
      { from: 0, to: 2, relationship: "which resolves", color: "#a1c4fd" },
    ],
    tags: ["Popular action"],
    actors: ["Egypt Non-Governmental"],
    locations: ["Jerusalem", "Jordan"],
    related_places: [],
    dateOptions: [
        "3 December 1953 - 9 December 1953",
        "24 November 1953",
        "3 November 1953 - 9 November 1953",
        "3 December 1952 - 9 December 1952",
    ],
    locationOptions: [
        "Jerusalem",
        "Amman, Jordan",
        "Cairo, Egypt",
        "Damascus, Syria",
    ],
    outcomeOptions: [
        "A General Islamic Conference, led by the Muslim Brotherhood, resolves that the defense of Palestine is a duty for every Muslim.",
        "The resolution that Palestine's defense is a duty for all Muslims is passed by a General Islamic Conference led by the Muslim Brotherhood.",
        "Every Muslim has a duty to defend Palestine, according to a resolution from a General Islamic Conference run by the Muslim Brotherhood.",
        "A Muslim Brotherhood-led General Islamic Conference resolves that it is the duty of all Muslims to defend Palestine.",
    ],
  },

  //event44

  // Add this event object to your 'events.ts' file

{
    title: "Arab League and Jordan River Waters",
    date: "15 February 1954",
    location: "Jordan",
    outcome: "Engineers from four Arab nations meet to prepare an Arab League plan for the use of Jordan River waters.",
    storyElements: [
        {
            text: "Engineers from Egypt, Syria, Jordan, and Lebanon meet in Jordan.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Engineers from Egypt, Syria, Jordan, and Lebanon meet in Jordan.",
                "A meeting of engineers from Egypt, Syria, Jordan, and Lebanon is held in Jordan.",
                "In Jordan, engineers from Egypt, Syria, Jordan, and Lebanon convene.",
                "Jordan hosts a meeting of engineers from Egypt, Syria, Jordan, and Lebanon.",
            ],
        },
        {
            text: "The meeting is to prepare a new Arab League plan.",
            category: "purpose",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The meeting is to prepare a new Arab League plan.",
                "The purpose of the meeting is to prepare a new Arab League plan.",
                "A new Arab League plan is the intended outcome of the meeting.",
                "To prepare a new plan for the Arab League is the reason for the meeting.",
            ],
        },
        {
            text: "The plan is for the exploitation of the Jordan River waters.",
            category: "subject",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The plan is for the exploitation of the Jordan River waters.",
                "The exploitation of the Jordan River waters is the subject of the plan.",
                "The plan concerns the use and exploitation of the Jordan River's waters.",
                "Regarding the Jordan River waters, the plan is about their exploitation.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "to prepare", color: "#a1c4fd" },
      { from: 1, to: 2, relationship: "for the", color: "#d299c2" },
    ],
    tags: ["Diplomatic", "Social-Economic"],
    actors: ["Syria Governmental", "Jordan Governmental", "Egypt Governmental", "Lebanon Governmental", "Arab League"],
    locations: ["Arab League", "Israel", "Jordan"],
    related_places: [],
    dateOptions: [
        "15 February 1954",
        "15 January 1954",
        "3 December 1953",
        "15 February 1953",
    ],
    locationOptions: [
        "Jordan",
        "Syria",
        "Lebanon",
        "Egypt",
    ],
    outcomeOptions: [
        "Engineers from four Arab nations meet to prepare an Arab League plan for the use of Jordan River waters.",
        "An Arab League plan for Jordan River water use is the subject of a meeting of engineers from four Arab nations.",
        "A meeting of engineers from four Arab countries is held to create an Arab League plan for Jordan River waters.",
        "The preparation of an Arab League plan for the Jordan River waters is the reason for a meeting of engineers from four Arab nations.",
    ],
  },

  //event45

  // Add this event object to your 'events.ts' file

{
    title: "Jordanian Nationality Law",
    date: "16 February 1954",
    location: "Jordan",
    outcome: "A new law grants Jordanian nationality to any non-Jewish Palestinian national residing in the kingdom, including refugees.",
    storyElements: [
        {
            text: "The new Nationality Law considers any non-Jewish person who possessed Palestinian nationality before 15 May 1948 a Jordanian national.",
            category: "definition",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 120, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The new Nationality Law considers any non-Jewish person who possessed Palestinian nationality before 15 May 1948 a Jordanian national.",
                "Any non-Jewish person with Palestinian nationality before 15 May 1948 is considered a Jordanian national by the new law.",
                "Under the new law, a non-Jewish person with Palestinian nationality before 15 May 1948 is deemed a Jordanian national.",
                "The status of Jordanian national is given to any non-Jewish person who held Palestinian nationality before 15 May 1948.",
            ],
        },
        {
            text: "The person must also ordinarily reside in Jordan on the publication date of the law.",
            category: "condition",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The person must also ordinarily reside in Jordan on the publication date of the law.",
                "A condition is that the person must normally live in Jordan on the law's publication date.",
                "Ordinary residence in Jordan on the date of the law's publication is also a requirement.",
                "The law requires the person to also be an ordinary resident of Jordan on its publication date.",
            ],
        },
        {
            text: "It thus grants citizenship to both indigenous West Bankers and Palestinian refugees.",
            category: "consequence",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "It thus grants citizenship to both indigenous West Bankers and Palestinian refugees.",
                "Citizenship is therefore granted to both native West Bankers and Palestinian refugees.",
                "As a result, it gives citizenship to indigenous West Bankers as well as Palestinian refugees.",
                "The law grants citizenship to both Palestinian refugees and the original inhabitants of the West Bank.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "provided", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "thereby granting", color: "#a1c4fd" },
    ],
    tags: ["Legal"],
    actors: ["Jordan Governmental"],
    locations: ["Jordan"],
    related_places: [],
    dateOptions: [
        "16 February 1954",
        "15 February 1954",
        "15 May 1948",
        "16 February 1953",
    ],
    locationOptions: [
        "Jordan",
        "The West Bank",
        "Amman",
        "Jerusalem",
    ],
    outcomeOptions: [
        "A new law grants Jordanian nationality to any non-Jewish Palestinian national residing in the kingdom, including refugees.",
        "Jordanian nationality is granted by a new law to non-Jewish Palestinians living in the kingdom, which includes refugees.",
        "A new law provides Jordanian nationality for any non-Jewish Palestinian national who lives in the kingdom, including refugees.",
        "The granting of Jordanian nationality to any non-Jewish Palestinian national living in the kingdom, refugees included, is done by a new law.",
    ],
  },

  //event46
  // Add this event object to your 'events.ts' file

{
    title: "Israeli Operation Against Jordan",
    date: "28 March 1954",
    location: "Nahalin, West Bank",
    outcome: "Israel attacks an Arab Legion base near Nahalin, destroying homes and killing villagers.",
    storyElements: [
        {
            text: "Israel attacks an Arab Legion base near the village of Nahalin.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Israel attacks an Arab Legion base near the village of Nahalin.",
                "An Arab Legion base near Nahalin village is attacked by Israel.",
                "An attack is launched by Israel on an Arab Legion base close to Nahalin.",
                "Near the village of Nahalin, an Israeli attack on an Arab Legion base occurs.",
            ],
        },
        {
            text: "The village is in the Bethlehem district.",
            category: "location",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The village is in the Bethlehem district.",
                "In the Bethlehem district is where the village is located.",
                "The location of the village is the Bethlehem district.",
                "The village is situated within the district of Bethlehem.",
            ],
        },
        {
            text: "The attack destroys homes and kills villagers.",
            category: "consequence",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The attack destroys homes and kills villagers.",
                "Homes are destroyed and villagers are killed in the attack.",
                "The destruction of homes and the death of villagers result from the attack.",
                "As a consequence of the attack, homes are destroyed and villagers are killed.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "located in", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "resulting in", color: "#ff9a9e" },
    ],
    tags: ["Violence"],
    actors: ["Israel Governmental", "Jordan Governmental", "Palestine Non-Governmental"],
    locations: ["Jordan", "West Bank"],
    related_places: [],
    dateOptions: [
        "28 March 1954",
        "16 February 1954",
        "28 February 1954",
        "28 March 1953",
    ],
    locationOptions: [
        "Nahalin, West Bank",
        "Bethlehem, West Bank",
        "Hebron, West Bank",
        "Jerusalem",
    ],
    outcomeOptions: [
        "Israel attacks an Arab Legion base near Nahalin, destroying homes and killing villagers.",
        "An Israeli attack on an Arab Legion base near Nahalin results in destroyed homes and dead villagers.",
        "The destruction of homes and killing of villagers occurs after Israel attacks an Arab Legion base near Nahalin.",
        "Homes are destroyed and villagers are killed when Israel attacks an Arab Legion base close to Nahalin.",
    ],
  },

  //event47

  // Add this event object to your 'events.ts' file

{
    title: "The US and Jordan River Waters",
    date: "25 June 1954 - 6 July 1954",
    location: "Cairo, Egypt",
    outcome: "US and Arab delegates agree on the need for international control of Jordan River waters, and key regional states accept the principle.",
    storyElements: [
        {
            text: "US representative Eric Johnston and Arab delegates issue a joint communiqué in Cairo.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "US representative Eric Johnston and Arab delegates issue a joint communiqué in Cairo.",
                "In Cairo, a joint communiqué is issued by US representative Eric Johnston and Arab delegates.",
                "A joint statement is released in Cairo by Eric Johnston, the US representative, and Arab delegates.",
                "The issuance of a joint communiqué in Cairo by Eric Johnston and Arab delegates occurs.",
            ],
        },
        {
            text: "They agree on the necessity of 'international control' over the Jordan River waters.",
            category: "agreement",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "They agree on the necessity of 'international control' over the Jordan River waters.",
                "The need for 'international control' of the Jordan River waters is agreed upon.",
                "An agreement is reached on the necessity of 'international control' for the Jordan River waters.",
                "They come to an agreement that 'international control' of the Jordan River waters is necessary.",
            ],
        },
        {
            text: "Johnston reports to President Eisenhower that Israel, Syria, Lebanon, and Jordan accept this principle.",
            category: "report",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Johnston reports to President Eisenhower that Israel, Syria, Lebanon, and Jordan accept this principle.",
                "A report is made by Johnston to President Eisenhower that the principle is accepted by Israel, Syria, Lebanon, and Jordan.",
                "President Eisenhower is informed by Johnston that Israel, Syria, Lebanon, and Jordan have accepted the principle.",
                "The acceptance of the principle by Israel, Syria, Lebanon, and Jordan is reported by Johnston to President Eisenhower.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "where they agree", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "after which", color: "#a1c4fd" },
    ],
    tags: ["Diplomatic", "Social-Economic"],
    actors: ["USA Governmental", "Israel Governmental", "Syria Governmental", "Jordan Governmental", "Lebanon Governmental", "Egypt Governmental"],
    locations: ["Egypt", "Israel", "Syria", "Lebanon", "Jordan"],
    related_places: [],
    dateOptions: [
        "25 June 1954 - 6 July 1954",
        "15 February 1954",
        "25 July 1954 - 6 August 1954",
        "25 June 1953 - 6 July 1953",
    ],
    locationOptions: [
        "Cairo, Egypt",
        "Amman, Jordan",
        "Damascus, Syria",
        "Washington D.C., USA",
    ],
    outcomeOptions: [
        "US and Arab delegates agree on the need for international control of Jordan River waters, and key regional states accept the principle.",
        "An agreement on the need for international control of the Jordan River is reached by US and Arab delegates, with the principle accepted by key states.",
        "Key regional states accept the principle of international control over the Jordan River waters after US and Arab delegates agree on the need.",
        "The need for international control of Jordan River waters is agreed upon by US and Arab delegates, and the principle is accepted by regional states.",
    ],
  },

  //event48
  // Add this event object to your 'events.ts' file

{
    title: "Israel and the Lavon Affair",
    date: "July 1954 - 17 February 1955",
    location: "Egypt",
    outcome: "A failed Israeli bombing plot in Egypt leads to strained international relations and the resignation of Israel's defense minister.",
    storyElements: [
        {
            text: "Israel plans terrorist attacks inside Egypt to be blamed on other groups.",
            category: "plan",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Israel plans terrorist attacks inside Egypt to be blamed on other groups.",
                "A plan is made by Israel for terrorist attacks in Egypt that would be blamed on others.",
                "Terrorist attacks are planned by Israel to occur in Egypt, with the blame placed on other groups.",
                "The Israeli plan involves conducting terrorist attacks in Egypt and blaming different groups.",
            ],
        },
        {
            text: "The goal is to destabilize Egypt and induce Britain to maintain its military presence in the Suez Canal zone.",
            category: "motive",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 120, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The goal is to destabilize Egypt and induce Britain to maintain its military presence in the Suez Canal zone.",
                "To destabilize Egypt and convince Britain to keep troops in the Suez is the aim.",
                "The objective is the destabilization of Egypt and the inducement of Britain to keep its military in Suez.",
                "The plan aims to destabilize Egypt, thereby persuading Britain to maintain its Suez military presence.",
            ],
        },
        {
            text: "The bombs cause no deaths and the plot is uncovered by Egyptian authorities.",
            category: "outcome",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The bombs cause no deaths and the plot is uncovered by Egyptian authorities.",
                "Egyptian authorities uncover the plot after the bombs fail to cause any deaths.",
                "The plot is discovered by Egyptian authorities, and the bombs do not result in any fatalities.",
                "No deaths are caused by the bombs, and the plan is exposed by Egyptian authorities.",
            ],
        },
        {
            text: "The event strains relations and prompts the resignation of defense minister Pinhas Lavon.",
            category: "consequence",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The event strains relations and prompts the resignation of defense minister Pinhas Lavon.",
                "The resignation of defense minister Pinhas Lavon is prompted by the event, which also strains relations.",
                "Strained relations and the resignation of the defense minister, Pinhas Lavon, are the results of the event.",
                "As a consequence, relations are strained and Pinhas Lavon, the defense minister, resigns.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "with the goal to", color: "#c3cfe2" },
      { from: 0, to: 2, relationship: "however,", color: "#c3cfe2" },
      { from: 2, to: 3, relationship: "which", color: "#d299c2" },
    ],
    tags: ["Violence", "Diplomatic"],
    actors: ["Israel Governmental", "Egypt Governmental", "Great Britain Governmental", "USA Governmental"],
    locations: ["Egypt", "Israel"],
    related_places: [],
    dateOptions: [
        "July 1954 - 17 February 1955",
        "July 1954 - August 1954",
        "17 February 1955",
        "July 1955 - 17 February 1956",
    ],
    locationOptions: [
        "Egypt",
        "Israel",
        "Suez Canal Zone",
        "Great Britain",
    ],
    outcomeOptions: [
        "A failed Israeli bombing plot in Egypt leads to strained international relations and the resignation of Israel's defense minister.",
        "Strained international relations and the resignation of the Israeli defense minister are the results of a failed bombing plot in Egypt.",
        "The failure of an Israeli bombing plot in Egypt causes strained relations and the resignation of the defense minister.",
        "Israel's defense minister resigns and international relations become strained after a bombing plot in Egypt fails.",
    ],
  },
  //event49
  // Add this event object to your 'events.ts' file

{
    title: "Covenant between Zionist Organization and Israel",
    date: "26 July 1954",
    location: "Israel",
    outcome: "A covenant is signed recognizing the Zionist Organization's role in immigration, land acquisition, and coordinating Jewish institutions.",
    storyElements: [
        {
            text: "A Covenant is signed between the Zionist Organization and the Government of Israel.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "A Covenant is signed between the Zionist Organization and the Government of Israel.",
                "The signing of a Covenant between the Zionist Organization and the Israeli government occurs.",
                "Between the Zionist Organization and the Government of Israel, a Covenant is signed.",
                "A formal Covenant is agreed upon and signed by the Zionist Organization and Israel's government.",
            ],
        },
        {
            text: "It recognizes the Zionist Executive's function of organizing immigration and absorption.",
            category: "function",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It recognizes the Zionist Executive's function of organizing immigration and absorption.",
                "The role of the Zionist Executive in organizing immigration and absorption is recognized.",
                "Recognition is given to the Zionist Executive's function of handling immigration and absorption.",
                "The covenant acknowledges the Zionist Executive's job of organizing immigrant absorption.",
            ],
        },
        {
            text: "It recognizes its function of acquiring and ameliorating land in Israel.",
            category: "function",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "It recognizes its function of acquiring and ameliorating land in Israel.",
                "The function of acquiring and improving land in Israel is also recognized.",
                "Recognition is also given to its role in acquiring and bettering land in Israel.",
                "Its job of acquiring and ameliorating Israeli land is also acknowledged.",
            ],
        },
        {
            text: "It recognizes its function of coordinating the activities of Jewish institutions.",
            category: "function",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "It recognizes its function of coordinating the activities of Jewish institutions.",
                "The coordination of activities of Jewish institutions is another recognized function.",
                "Its role in coordinating the activities of Jewish institutions is also recognized.",
                "The covenant acknowledges its function in coordinating the work of Jewish institutions.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which recognizes", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "which recognizes", color: "#a1c4fd" },
      { from: 0, to: 3, relationship: "which recognizes", color: "#a1c4fd" },
    ],
    tags: ["Institutional"],
    actors: ["Israel Governmental", "Israel Non-Governmental"],
    locations: ["Israel"],
    related_places: [],
    dateOptions: [
        "26 July 1954",
        "24 November 1952",
        "26 June 1954",
        "26 July 1953",
    ],
    locationOptions: [
        "Israel",
        "Jerusalem",
        "Tel Aviv",
        "Haifa",
    ],
    outcomeOptions: [
        "A covenant is signed recognizing the Zionist Organization's role in immigration, land acquisition, and coordinating Jewish institutions.",
        "The role of the Zionist Organization in immigration, land, and coordination of Jewish institutions is recognized in a new covenant.",
        "A signed covenant acknowledges the Zionist Organization's functions regarding immigration, land acquisition, and institutional coordination.",
        "Recognition of the Zionist Organization's role in immigration, land, and coordination is formalized in a signed covenant.",
    ],
  },

  //event40
  // Add this event object to your 'events.ts' file

{
    title: "The Knesset Issues the Prevention of Infiltration Law",
    date: "16 August 1954",
    location: "Israel",
    outcome: "A law is issued to prevent refugee return, defining 'infiltrators,' creating military tribunals, and empowering the defense minister to deport them.",
    storyElements: [
        {
            text: "The law is part of a campaign to prevent the return of refugees and expel 'unlawful' residents.",
            category: "purpose",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The law is part of a campaign to prevent the return of refugees and expel 'unlawful' residents.",
                "As part of a campaign, the law aims to stop refugees from returning and to expel 'unlawful' residents.",
                "To prevent refugee return and expel 'unlawful' residents, this law is part of a wider campaign.",
                "This law is a component of a campaign designed to prevent refugee returns and expel 'unlawful' residents.",
            ],
        },
        {
            text: "It defines an 'infiltrator' as a Palestinian who left his residence for a place outside Israel.",
            category: "definition",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "It defines an 'infiltrator' as a Palestinian who left his residence for a place outside Israel.",
                "An 'infiltrator' is defined as a Palestinian who went from his home to a location outside Israel.",
                "The definition of 'infiltrator' includes any Palestinian who left their home for a place outside Israel.",
                "A Palestinian who left their residence to go outside Israel is defined by the law as an 'infiltrator'.",
            ],
        },
        {
            text: "It establishes special military tribunals to punish 'infiltrators' and those who shelter them.",
            category: "mechanism",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It establishes special military tribunals to punish 'infiltrators' and those who shelter them.",
                "Special military courts are created to punish 'infiltrators' and anyone who helps them.",
                "The law sets up special military tribunals for the punishment of 'infiltrators' and their helpers.",
                "To punish 'infiltrators' and those providing them shelter, special military tribunals are established.",
            ],
        },
        {
            text: "It empowers the minister of defense to order the deportation of an infiltrator.",
            category: "power",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "It empowers the minister of defense to order the deportation of an infiltrator.",
                "The defense minister is given the power to order the deportation of an infiltrator.",
                "The power to order an infiltrator's deportation is granted to the minister of defense.",
                "The minister of defense is empowered by the law to command the deportation of an infiltrator.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "by defining", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "who are tried in", color: "#a1c4fd" },
      { from: 1, to: 3, relationship: "and can be deported by", color: "#a1c4fd" },
    ],
    tags: ["Legal", "Sanctions"],
    actors: ["Israel Governmental"],
    locations: ["Israel"],
    related_places: [],
    dateOptions: [
        "16 August 1954",
        "26 August 1952",
        "16 July 1954",
        "16 August 1953",
    ],
    locationOptions: [
        "Israel",
        "The West Bank",
        "Gaza Strip",
        "Jerusalem",
    ],
    outcomeOptions: [
        "A law is issued to prevent refugee return, defining 'infiltrators,' creating military tribunals, and empowering the defense minister to deport them.",
        "The prevention of refugee return is addressed by a law that defines 'infiltrators,' sets up military courts, and allows the defense minister to deport.",
        "A law defining 'infiltrators,' establishing military tribunals, and giving the defense minister deportation power is passed to stop refugee returns.",
        "To stop refugees from returning, a law is created that defines 'infiltrators,' establishes military courts, and grants deportation power to the defense minister.",
    ],
  },

  //event41
  // Add this event object to your 'events.ts' file

{
    title: "Egypt Detains Israeli Freighter",
    date: "28 September 1954",
    location: "Suez Canal, Egypt",
    outcome: "Egypt detains an Israeli freighter in the Suez Canal, arresting the crew and confiscating its cargo.",
    storyElements: [
        {
            text: "Egypt detains the Israeli freighter Bat Galim in the Suez Canal.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Egypt detains the Israeli freighter Bat Galim in the Suez Canal.",
                "In the Suez Canal, the Israeli freighter Bat Galim is detained by Egypt.",
                "The detention of the Israeli freighter Bat Galim in the Suez Canal is carried out by Egypt.",
                "The Bat Galim, an Israeli freighter, is detained by Egyptian authorities in the Suez Canal.",
            ],
        },
        {
            text: "It was en route to Haifa from Eritrea.",
            category: "detail",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It was en route to Haifa from Eritrea.",
                "The ship was traveling from Eritrea to Haifa.",
                "Its journey was from Eritrea with a destination of Haifa.",
                "From Eritrea, the freighter was on its way to Haifa.",
            ],
        },
        {
            text: "Egypt arrests the crew and confiscates its cargo.",
            category: "consequence",
            position: { x: 650, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Egypt arrests the crew and confiscates its cargo.",
                "The crew is arrested and the cargo is confiscated by Egypt.",
                "The arrest of the crew and the confiscation of the cargo is done by Egypt.",
                "Egyptian authorities arrest the crew and seize the ship's cargo.",
            ],
        },
        {
            text: "Egypt accuses the crew of firing on Egyptian fishermen.",
            category: "justification",
            position: { x: 400, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 260, 
                height: 80, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Egypt accuses the crew of firing on Egyptian fishermen.",
                "The crew is accused by Egypt of having fired on Egyptian fishermen.",
                "An accusation is made by Egypt that the crew fired on their fishermen.",
                "The reason given by Egypt is that the crew fired on their fishermen.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which was", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "and", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "because", color: "#ff9a9e" },
    ],
    tags: ["Sanctions", "Social-Economic"],
    actors: ["Egypt Governmental", "Israel Non-Governmental"],
    locations: ["Egypt"],
    related_places: [],
    dateOptions: [
        "28 September 1954",
        "16 August 1954",
        "28 August 1954",
        "28 September 1953",
    ],
    locationOptions: [
        "Suez Canal, Egypt",
        "Haifa, Israel",
        "Eritrea",
        "Cairo, Egypt",
    ],
    outcomeOptions: [
        "Egypt detains an Israeli freighter in the Suez Canal, arresting the crew and confiscating its cargo.",
        "An Israeli freighter is detained in the Suez Canal by Egypt, which arrests the crew and seizes the cargo.",
        "The detention of an Israeli freighter in the Suez Canal, along with the crew's arrest and cargo seizure, is carried out by Egypt.",
        "In the Suez Canal, an Israeli freighter is detained, its crew arrested, and its cargo confiscated by Egyptian authorities.",
    ],
  },

  //event42

  // Add this event object to your 'events.ts' file

{
    title: "Exchange of Notes between Lebanon and UNRWA",
    date: "26 November 1954",
    location: "Lebanon",
    outcome: "An agreement is reached defining UNRWA's status in Lebanon, with Lebanon agreeing to a small contribution to the agency's budget.",
    storyElements: [
        {
            text: "Lebanon and UNRWA reach an agreement through an exchange of notes.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Lebanon and UNRWA reach an agreement through an exchange of notes.",
                "An agreement is reached between Lebanon and UNRWA via an exchange of notes.",
                "Through an exchange of notes, an agreement between Lebanon and UNRWA is made.",
                "An exchange of notes leads to an agreement between Lebanon and UNRWA.",
            ],
        },
        {
            text: "The agreement defines UNRWA's diplomatic status, privileges, and immunities in Lebanon.",
            category: "scope",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The agreement defines UNRWA's diplomatic status, privileges, and immunities in Lebanon.",
                "UNRWA's diplomatic status, privileges, and immunities in Lebanon are defined by the agreement.",
                "The definition of UNRWA's diplomatic status, privileges, and immunities is covered in the agreement.",
                "In Lebanon, the agreement specifies UNRWA's diplomatic status, privileges, and immunities.",
            ],
        },
        {
            text: "The Lebanese government agrees to contribute 0.06% of the agency's budget.",
            category: "contribution",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The Lebanese government agrees to contribute 0.06% of the agency's budget.",
                "A contribution of 0.06% of the agency's budget is agreed to by the Lebanese government.",
                "The government of Lebanon agrees to make a contribution of 0.06% of the agency's budget.",
                "An agreement is made for the Lebanese government to contribute 0.06% of the agency's budget.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which defines", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "and where", color: "#a1c4fd" },
    ],
    tags: ["Diplomatic"],
    actors: ["Lebanon Governmental", "UN Inter-Governmental"],
    locations: ["Lebanon"],
    related_places: [],
    dateOptions: [
        "26 November 1954",
        "28 September 1954",
        "26 October 1954",
        "26 November 1953",
    ],
    locationOptions: [
        "Lebanon",
        "Beirut",
        "New York, USA",
        "Geneva, Switzerland",
    ],
    outcomeOptions: [
        "An agreement is reached defining UNRWA's status in Lebanon, with Lebanon agreeing to a small contribution to the agency's budget.",
        "UNRWA's status in Lebanon is defined by an agreement that also includes a small budget contribution from Lebanon.",
        "Lebanon agrees to a small budget contribution in an agreement that defines the status of UNRWA in the country.",
        "An agreement is made on UNRWA's status in Lebanon, and it includes a minor contribution to the agency's budget from Lebanon.",
    ],
  },

  //event43
  // Add this event object to your 'events.ts' file

{
    title: "Israel Carries out an Intelligence Operation in Syria and the First Airline Hijacking in the History of the Conflict",
    date: "8 December 1954 - 14 December 1954",
    location: "Syria",
    outcome: "After its commandos are captured, Israel hijacks a Syrian airliner but returns it after international pressure.",
    storyElements: [
        {
            text: "A five-member Israeli commando team is captured by the Syrian army during an intelligence operation.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "A five-member Israeli commando team is captured by the Syrian army during an intelligence operation.",
                "During an intelligence operation, a five-member Israeli commando team is captured by Syrian forces.",
                "The Syrian army captures a five-member Israeli commando team on an intelligence mission.",
                "The capture of a five-member Israeli commando team on an intelligence mission is carried out by the Syrian army.",
            ],
        },
        {
            text: "Israel's air force intercepts a Syrian airliner and forces it to land in Israel.",
            category: "retaliation",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Israel's air force intercepts a Syrian airliner and forces it to land in Israel.",
                "A Syrian airliner is intercepted by the Israeli air force and made to land in Israel.",
                "The Israeli air force forces down a Syrian airliner, making it land in Israel.",
                "The interception and forced landing of a Syrian airliner in Israel is conducted by the Israeli air force.",
            ],
        },
        {
            text: "This represents the first hijacking in the history of the Arab-Israeli conflict.",
            category: "significance",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "This represents the first hijacking in the history of the Arab-Israeli conflict.",
                "It is the first instance of a hijacking in the Arab-Israeli conflict's history.",
                "The first hijacking ever in the Arab-Israeli conflict is what this event represents.",
                "In the history of the Arab-Israeli conflict, this is the first hijacking.",
            ],
        },
        {
            text: "Under heavy international pressure, Israel returns the aircraft and its passengers.",
            category: "resolution",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Under heavy international pressure, Israel returns the aircraft and its passengers.",
                "Israel returns the plane and its passengers due to significant international pressure.",
                "The return of the aircraft and passengers by Israel is forced by heavy international pressure.",
                "Due to strong international pressure, the aircraft and passengers are returned by Israel.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "in response", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "which is the", color: "#a1c4fd" },
      { from: 1, to: 3, relationship: "but", color: "#a1c4fd" },
    ],
    tags: ["Violence"],
    actors: ["Israel Governmental", "Syria Governmental"],
    locations: ["Israel", "Syria"],
    related_places: [],
    dateOptions: [
        "8 December 1954 - 14 December 1954",
        "12 December 1954 - 14 December 1954",
        "8 December 1954",
        "8 December 1953 - 14 December 1953",
    ],
    locationOptions: [
        "Syria",
        "Israel",
        "Mediterranean Sea",
        "Damascus, Syria",
    ],
    outcomeOptions: [
        "After its commandos are captured, Israel hijacks a Syrian airliner but returns it after international pressure.",
        "Israel hijacks a Syrian plane after its commandos are captured, but international pressure forces its return.",
        "The capture of its commandos leads Israel to hijack a Syrian airliner, which is then returned due to international pressure.",
        "A Syrian airliner is hijacked by Israel following the capture of its commandos, but it is returned because of international pressure.",
    ],
  },

  //event44
  // Add this event object to your 'events.ts' file

{
    title: "Lebanon Exempts Palestinian Refugees from Travel Document Fees",
    date: "29 December 1954",
    location: "Lebanon",
    outcome: "A decree is issued in Lebanon exempting Palestinian refugees from all fees related to travel documents.",
    storyElements: [
        {
            text: "Decree No. 7706 exempts Palestinian refugees in Lebanon from paying fees.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Decree No. 7706 exempts Palestinian refugees in Lebanon from paying fees.",
                "Palestinian refugees in Lebanon are exempted from fees by Decree No. 7706.",
                "The payment of fees by Palestinian refugees in Lebanon is exempted under Decree No. 7706.",
                "An exemption from fee payment for Palestinian refugees in Lebanon is made by Decree No. 7706.",
            ],
        },
        {
            text: "The fees are for obtaining, extending, and renewing travel documents.",
            category: "scope",
            position: { x: 400, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The fees are for obtaining, extending, and renewing travel documents.",
                "For obtaining, extending, and renewing travel documents are what the fees cover.",
                "The exemption applies to fees for getting, extending, and renewing travel documents.",
                "The fees for which refugees are exempted are for the issuance, extension, and renewal of travel documents.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "specifically for", color: "#a1c4fd" },
    ],
    tags: ["Legal", "Policy-Program"],
    actors: ["Lebanon Governmental"],
    locations: ["Lebanon"],
    related_places: [],
    dateOptions: [
        "29 December 1954",
        "26 November 1954",
        "29 November 1954",
        "29 December 1953",
    ],
    locationOptions: [
        "Lebanon",
        "Beirut",
        "Syria",
        "Jordan",
    ],
    outcomeOptions: [
        "A decree is issued in Lebanon exempting Palestinian refugees from all fees related to travel documents.",
        "Palestinian refugees in Lebanon are exempted from travel document fees by a new decree.",
        "A Lebanese decree removes all fees for travel documents for Palestinian refugees.",
        "The exemption of Palestinian refugees from paying for travel documents is enacted by a decree in Lebanon.",
    ],
  },

  //event45
// Add this event object to your 'events.ts' file

{
    title: "Baghdad Pact",
    date: "24 February 1955",
    location: "Baghdad, Iraq",
    outcome: "A 'pact of mutual cooperation' is signed to counter Soviet influence, but Egyptian opposition limits its membership.",
    storyElements: [
        {
            text: "Iraq and Turkey sign a 'pact of mutual cooperation,' known as the Baghdad Pact.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Iraq and Turkey sign a 'pact of mutual cooperation,' known as the Baghdad Pact.",
                "A 'pact of mutual cooperation' is signed by Iraq and Turkey, becoming the Baghdad Pact.",
                "The Baghdad Pact is formed when Iraq and Turkey sign a 'pact of mutual cooperation'.",
                "The signing of a 'pact of mutual cooperation' by Iraq and Turkey creates the Baghdad Pact.",
            ],
        },
        {
            text: "The pact's goal is to counter Moscow's rising influence in the Arab and Muslim world.",
            category: "purpose",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The pact's goal is to counter Moscow's rising influence in the Arab and Muslim world.",
                "To counter the growing influence of Moscow in the Arab and Muslim world is the pact's objective.",
                "The aim of the pact is to stand against Moscow's increasing influence in the Arab and Muslim world.",
                "The pact is designed to oppose the rising influence of Moscow in the Arab and Muslim world.",
            ],
        },
        {
            text: "Britain, Pakistan, and Iran will also join the pact.",
            category: "expansion",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Britain, Pakistan, and Iran will also join the pact.",
                "The pact will later be joined by Britain, Pakistan, and Iran.",
                "The joining of Britain, Pakistan, and Iran to the pact will occur later.",
                "Also becoming members of the pact are Britain, Pakistan, and Iran.",
            ],
        },
        {
            text: "Egyptian president Nasser's denunciation of the pact discourages further signatories.",
            category: "complication",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Egyptian president Nasser's denunciation of the pact discourages further signatories.",
                "Further signatories are discouraged by Egyptian president Nasser's condemnation of the pact.",
                "The denunciation of the pact by Nasser of Egypt deters other countries from signing.",
                "Because of Egyptian president Nasser's denunciation, the pact fails to attract more signatories.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "to", color: "#c3cfe2" },
      { from: 0, to: 2, relationship: "and is joined by", color: "#c3cfe2" },
      { from: 0, to: 3, relationship: "but", color: "#c3cfe2" },
    ],
    tags: ["Diplomatic", "Institutional"],
    actors: ["Turkey Governmental", "Iraq Governmental", "Great Britain Governmental", "Iran Governmental", "Pakistan Governmental", "Egypt Governmental"],
    locations: ["Iraq"],
    related_places: [],
    dateOptions: [
        "24 February 1955",
        "17 February 1955",
        "24 January 1955",
        "24 February 1954",
    ],
    locationOptions: [
        "Baghdad, Iraq",
        "Ankara, Turkey",
        "London, Great Britain",
        "Cairo, Egypt",
    ],
    outcomeOptions: [
        "A 'pact of mutual cooperation' is signed to counter Soviet influence, but Egyptian opposition limits its membership.",
        "To counter Soviet influence, a 'pact of mutual cooperation' is signed, though Egyptian opposition keeps membership low.",
        "A pact to oppose Soviet influence is created, but due to Egyptian opposition, it does not gain many members.",
        "Despite its goal of countering Soviet influence, a 'pact of mutual cooperation' has limited signatories because of Egyptian opposition.",
    ],
  },
  //event47
  // Add this event object to your 'events.ts' file

{
    title: "Bloody Israeli Attack on the Gaza Strip",
    date: "28 February 1955",
    location: "Gaza Strip",
    outcome: "Israel attacks an Egyptian military post, killing 38 soldiers, in retaliation for a Palestinian raid.",
    storyElements: [
        {
            text: "Israel launches a surprise attack on an Egyptian military post near Gaza city.",
            category: "action",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Israel launches a surprise attack on an Egyptian military post near Gaza city.",
                "A surprise attack on an Egyptian military post near Gaza city is launched by Israel.",
                "Near Gaza city, an Egyptian military post is the target of a surprise Israeli attack.",
                "The launch of a surprise attack by Israel on an Egyptian military post near Gaza city occurs.",
            ],
        },
        {
            text: "The attack kills 38 Egyptian soldiers.",
            category: "consequence",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The attack kills 38 Egyptian soldiers.",
                "38 Egyptian soldiers are killed in the attack.",
                "The death of 38 Egyptian soldiers is the result of the attack.",
                "As a result of the attack, 38 Egyptian soldiers are killed.",
            ],
        },
        {
            text: "The attack follows raids by young Palestinians, one of which killed an Israeli.",
            category: "trigger",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The attack follows raids by young Palestinians, one of which killed an Israeli.",
                "Raids by young Palestinians, including one that killed an Israeli, preceded the attack.",
                "The attack came after raids by young Palestinians, one of which resulted in an Israeli death.",
                "After young Palestinians conducted raids, one killing an Israeli, the attack took place.",
            ],
        },
        {
            text: "One raid was carried out by a cell organized by Khalil al-Wazir.",
            category: "detail",
            position: { x: 150, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "One raid was carried out by a cell organized by Khalil al-Wazir.",
                "A cell organized by Khalil al-Wazir was responsible for one of the raids.",
                "The carrying out of one raid was done by a cell organized by Khalil al-Wazir.",
                "Khalil al-Wazir organized a cell that conducted one of the raids.",
            ],
        },
    ],
    storyConnections: [
      { from: 2, to: 0, relationship: "leading to", color: "#c3cfe2" },
      { from: 0, to: 1, relationship: "resulting in", color: "#ff9a9e" },
      { from: 2, to: 3, relationship: "one of which was", color: "#c3cfe2" },
    ],
    tags: ["Violence"],
    actors: ["Israel Governmental", "Egypt Governmental", "Palestine Non-Governmental"],
    locations: ["Gaza Strip", "Israel"],
    related_places: [],
    dateOptions: [
        "28 February 1955",
        "25 February 1955",
        "24 February 1955",
        "28 January 1955",
    ],
    locationOptions: [
        "Gaza Strip",
        "Near Gaza City",
        "Israel",
        "Egypt",
    ],
    outcomeOptions: [
        "Israel attacks an Egyptian military post, killing 38 soldiers, in retaliation for a Palestinian raid.",
        "A retaliatory Israeli attack on an Egyptian military post kills 38 soldiers following a Palestinian raid.",
        "Following a Palestinian raid, Israel attacks an Egyptian military post and kills 38 soldiers.",
        "The killing of 38 Egyptian soldiers occurs when Israel attacks their military post in response to a Palestinian raid.",
    ],
  },
  //event48
// Add this event object to your 'events.ts' file

{
    title: "Bloody Israeli Attack on the Gaza Strip",
    date: "28 February 1955",
    location: "Gaza Strip",
    outcome: "Israel attacks an Egyptian military post, killing 38 soldiers, in retaliation for a Palestinian raid.",
    storyElements: [
        {
            text: "Israel launches a surprise attack on an Egyptian military post near Gaza city.",
            category: "action",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Israel launches a surprise attack on an Egyptian military post near Gaza city.",
                "A surprise attack on an Egyptian military post near Gaza city is launched by Israel.",
                "Near Gaza city, an Egyptian military post is the target of a surprise Israeli attack.",
                "The launch of a surprise attack by Israel on an Egyptian military post near Gaza city occurs.",
            ],
        },
        {
            text: "The attack kills 38 Egyptian soldiers.",
            category: "consequence",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The attack kills 38 Egyptian soldiers.",
                "38 Egyptian soldiers are killed in the attack.",
                "The death of 38 Egyptian soldiers is the result of the attack.",
                "As a result of the attack, 38 Egyptian soldiers are killed.",
            ],
        },
        {
            text: "The attack follows raids by young Palestinians, one of which killed an Israeli.",
            category: "trigger",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The attack follows raids by young Palestinians, one of which killed an Israeli.",
                "Raids by young Palestinians, including one that killed an Israeli, preceded the attack.",
                "The attack came after raids by young Palestinians, one of which resulted in an Israeli death.",
                "After young Palestinians conducted raids, one killing an Israeli, the attack took place.",
            ],
        },
        {
            text: "One raid was carried out by a cell organized by Khalil al-Wazir.",
            category: "detail",
            position: { x: 150, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "One raid was carried out by a cell organized by Khalil al-Wazir.",
                "A cell organized by Khalil al-Wazir was responsible for one of the raids.",
                "The carrying out of one raid was done by a cell organized by Khalil al-Wazir.",
                "Khalil al-Wazir organized a cell that conducted one of the raids.",
            ],
        },
    ],
    storyConnections: [
      { from: 2, to: 0, relationship: "leading to", color: "#c3cfe2" },
      { from: 0, to: 1, relationship: "resulting in", color: "#ff9a9e" },
      { from: 2, to: 3, relationship: "one of which was", color: "#c3cfe2" },
    ],
    tags: ["Violence"],
    actors: ["Israel Governmental", "Egypt Governmental", "Palestine Non-Governmental"],
    locations: ["Gaza Strip", "Israel"],
    related_places: [],
    dateOptions: [
        "28 February 1955",
        "25 February 1955",
        "24 February 1955",
        "28 January 1955",
    ],
    locationOptions: [
        "Gaza Strip",
        "Near Gaza City",
        "Israel",
        "Egypt",
    ],
    outcomeOptions: [
        "Israel attacks an Egyptian military post, killing 38 soldiers, in retaliation for a Palestinian raid.",
        "A retaliatory Israeli attack on an Egyptian military post kills 38 soldiers following a Palestinian raid.",
        "Following a Palestinian raid, Israel attacks an Egyptian military post and kills 38 soldiers.",
        "The killing of 38 Egyptian soldiers occurs when Israel attacks their military post in response to a Palestinian raid.",
    ],
  },
  //event49
// Add this event object to your 'events.ts' file

{
    title: "Palestinians in Gaza Rise Up Against Resettlement Projects",
    date: "1 March 1955 - 6 March 1955",
    location: "Gaza Strip",
    outcome: "Palestinian refugees demonstrate against resettlement, leading Egypt to end the Sinai project and form Palestinian battalions.",
    storyElements: [
        {
            text: "Following a bloody Israeli raid, Palestinian refugees rise up in Gaza.",
            category: "trigger",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Following a bloody Israeli raid, Palestinian refugees rise up in Gaza.",
                "Palestinian refugees in Gaza rise up after a bloody Israeli raid.",
                "A bloody Israeli raid triggers an uprising of Palestinian refugees in Gaza.",
                "The uprising of Palestinian refugees in Gaza follows a bloody Israeli raid.",
            ],
        },
        {
            text: "A Supreme National Committee is formed, representing all refugee camps.",
            category: "organization",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "A Supreme National Committee is formed, representing all refugee camps.",
                "Representing all refugee camps, a Supreme National Committee is created.",
                "The formation of a Supreme National Committee to represent all refugee camps occurs.",
                "A Supreme National Committee is established to speak for all the refugee camps.",
            ],
        },
        {
            text: "They demand an end to resettlement projects, particularly the Sinai plan.",
            category: "demand",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "They demand an end to resettlement projects, particularly the Sinai plan.",
                "An end to resettlement projects, especially the Sinai plan, is demanded.",
                "A key demand is to stop all resettlement projects, with a focus on the Sinai plan.",
                "They call for the cessation of resettlement projects, most notably the Sinai plan.",
            ],
        },
        {
            text: "They also demand training and arms to defend themselves against Israeli raids.",
            category: "demand",

            position: { x: 700, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "They also demand training and arms to defend themselves against Israeli raids.",
                "Training and arms for self-defense against Israeli raids is another of their demands.",
                "A demand is also made for arms and training to defend against Israeli raids.",
                "To defend themselves from Israeli raids, they also demand to be trained and armed.",
            ],
        },
        {
            text: "Egypt agrees to end the Sinai project and to constitute Palestinian battalions.",
            category: "response",
            position: { x: 150, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#66a6ff" 
            },
            options: [
                "Egypt agrees to end the Sinai project and to constitute Palestinian battalions.",
                "The Sinai project is ended and Palestinian battalions are formed by agreement with Egypt.",
                "An agreement is reached with Egypt to stop the Sinai project and create Palestinian battalions.",
                "Egypt consents to halting the Sinai project and establishing Palestinian battalions.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "leading to", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "which demands", color: "#a1c4fd" },
      { from: 1, to: 3, relationship: "and demands", color: "#a1c4fd" },
      { from: 2, to: 4, relationship: "leading to", color: "#d299c2" },
    ],
    tags: ["Popular action"],
    actors: ["Palestine Non-Governmental", "Egypt Governmental"],
    locations: ["Gaza Strip"],
    related_places: [],
    dateOptions: [
        "1 March 1955 - 6 March 1955",
        "28 February 1955",
        "1 March 1953 - 6 March 1953",
        "1 February 1955 - 6 February 1955",
    ],
    locationOptions: [
        "Gaza Strip",
        "Sinai",
        "Cairo, Egypt",
        "Gaza City",
    ],
    outcomeOptions: [
        "Palestinian refugees demonstrate against resettlement, leading Egypt to end the Sinai project and form Palestinian battalions.",
        "Protests by Palestinian refugees against resettlement result in Egypt stopping the Sinai project and creating Palestinian battalions.",
        "Egypt's decision to end the Sinai project and form Palestinian battalions comes after refugee demonstrations against resettlement.",
        "Demonstrations against resettlement by Palestinian refugees cause Egypt to cancel the Sinai project and establish Palestinian battalions.",
    ],
  },
  //event50
// Add this event object to your 'events.ts' file

{
    title: "SC Res. 106: Condemning Israel’s Attack against Egypt’s Regular Army in Gaza",
    date: "29 March 1955",
    location: "New York, USA",
    outcome: "The UN Security Council condemns Israel's attack on the Egyptian army in Gaza as a violation of the ceasefire.",
    storyElements: [
        {
            text: "The resolution condemns a 'planned attack ordered by Israel authorities' against the Egyptian army.",
            category: "condemnation",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The resolution condemns a 'planned attack ordered by Israel authorities' against the Egyptian army.",
                "A 'planned attack ordered by Israel authorities' against the Egyptian army is condemned by the resolution.",
                "The condemnation of a 'planned attack ordered by Israel authorities' against the Egyptian army is stated in the resolution.",
                "In the resolution, a 'planned attack ordered by Israel authorities' against the Egyptian army is condemned.",
            ],
        },
        {
            text: "It is considered a violation of the cease-fire provisions of Security Council Resolution 54 (1948).",
            category: "violation",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "It is considered a violation of the cease-fire provisions of Security Council Resolution 54 (1948).",
                "A violation of the cease-fire provisions of SCR 54 (1948) is what the attack is considered.",
                "The attack is deemed to be a violation of the cease-fire provisions of Security Council Resolution 54 (1948).",
                "The consideration is that it violates the cease-fire provisions of Security Council Resolution 54 (1948).",
            ],
        },
        {
            text: "It is also considered inconsistent with the General Armistice Agreement between Israel and Egypt.",
            category: "violation",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It is also considered inconsistent with the General Armistice Agreement between Israel and Egypt.",
                "Inconsistency with the General Armistice Agreement between Israel and Egypt is also noted.",
                "The attack is also deemed to be inconsistent with the Israel-Egypt General Armistice Agreement.",
                "It is also seen as not being in line with the General Armistice Agreement between Israel and Egypt.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "as a", color: "#ff9a9e" },
      { from: 0, to: 2, relationship: "and as", color: "#ff9a9e" },
    ],
    tags: ["Diplomatic", "Violence"],
    actors: ["UN Inter-Governmental", "Israel Governmental", "Egypt Governmental"],
    locations: [],
    related_places: [],
    dateOptions: [
        "29 March 1955",
        "28 February 1955",
        "29 April 1955",
        "29 March 1954",
    ],
    locationOptions: [
        "New York, USA",
        "Gaza Strip",
        "Cairo, Egypt",
        "Jerusalem",
    ],
    outcomeOptions: [
        "The UN Security Council condemns Israel's attack on the Egyptian army in Gaza as a violation of the ceasefire.",
        "A condemnation is issued by the UNSC for Israel's attack on the Egyptian army in Gaza, calling it a ceasefire violation.",
        "Israel's attack on the Egyptian army in Gaza is condemned by the UN Security Council as a violation of the ceasefire.",
        "As a ceasefire violation, the attack by Israel on the Egyptian army in Gaza is condemned by the UNSC.",
    ],
},
//event51
// Add this event object to your 'events.ts' file

{
    title: "With Mounting Tension In and Around Gaza, a Turning Point for Egypt and Opportunities for Israel",
    date: "3 April 1955 - 27 September 1955",
    location: "Gaza Strip",
    outcome: "Egypt's defense policy shifts, leading to the formation of Palestinian units and a Soviet arms deal, while Israel's leadership proposes conquering Gaza.",
    storyElements: [
        {
            text: "Israeli raids and Palestinian mobilization lead to a watershed in Egypt's defense policy.",
            category: "trigger",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Israeli raids and Palestinian mobilization lead to a watershed in Egypt's defense policy.",
                "A turning point in Egypt's defense policy is caused by Israeli raids and Palestinian mobilization.",
                "Egypt's defense policy undergoes a major change due to Israeli raids and Palestinian mobilization.",
                "The combination of Israeli raids and Palestinian mobilization results in a watershed for Egyptian defense policy.",
            ],
        },
        {
            text: "Battalions of Palestinian national guards are constituted and trained to guard Gaza borders.",
            category: "response",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Battalions of Palestinian national guards are constituted and trained to guard Gaza borders.",
                "Palestinian national guard battalions are formed and trained to protect the borders of Gaza.",
                "The creation and training of Palestinian national guard battalions to guard Gaza's borders occurs.",
                "To guard the borders of Gaza, battalions of Palestinian national guards are established and trained.",
            ],
        },
        {
            text: "Palestinians, known as fedayeen, receive Egyptian special training for operations inside Israel.",
            category: "response",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#66a6ff" 
            },
            options: [
                "Palestinians, known as fedayeen, receive Egyptian special training for operations inside Israel.",
                "Egyptian special training is given to Palestinians, known as fedayeen, for missions inside Israel.",
                "For operations within Israel, Palestinians called fedayeen get special training from Egypt.",
                "The training of Palestinian fedayeen by Egypt for special operations in Israel takes place.",
            ],
        },
        {
            text: "David Ben-Gurion proposes to the cabinet the conquest of the Gaza Strip.",
            category: "counter-action",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "David Ben-Gurion proposes to the cabinet the conquest of the Gaza Strip.",
                "The conquest of the Gaza Strip is proposed to the cabinet by David Ben-Gurion.",
                "A proposal to conquer the Gaza Strip is made to the cabinet by David Ben-Gurion.",
                "David Ben-Gurion suggests to the cabinet that they should conquer the Gaza Strip.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "leading to", color: "#c3cfe2" },
      { from: 0, to: 2, relationship: "and", color: "#c3cfe2" },
      { from: 0, to: 3, relationship: "prompting", color: "#c3cfe2" },
    ],
    tags: ["Policy-Program", "Diplomatic"],
    actors: ["Israel Governmental", "Egypt Governmental", "Palestine Non-Governmental"],
    locations: ["Gaza Strip", "Israel"],
    related_places: [],
    dateOptions: [
        "3 April 1955 - 27 September 1955",
        "28 February 1955 - 3 April 1955",
        "27 September 1955 - 1 November 1955",
        "3 April 1956 - 27 September 1956",
    ],
    locationOptions: [
        "Gaza Strip",
        "Israel",
        "Egypt",
        "Sinai",
    ],
    outcomeOptions: [
        "Egypt's defense policy shifts, leading to the formation of Palestinian units and a Soviet arms deal, while Israel's leadership proposes conquering Gaza.",
        "A change in Egyptian defense policy results in Palestinian units and a Soviet arms deal, as Israel's leaders consider taking Gaza.",
        "The formation of Palestinian units and a Soviet arms deal by Egypt marks a policy shift, while Israel's leadership mulls a Gaza conquest.",
        "While Israel's leaders propose conquering Gaza, Egypt's defense policy changes, resulting in Palestinian units and a Soviet arms deal.",
    ],
  },
  //event52
  // Add this event object to your 'events.ts' file

{
    title: "Gaza's Basic Law",
    date: "11 May 1955",
    location: "Gaza Strip",
    outcome: "Egypt issues a 'Basic Law' for Gaza to replace the British Mandate's constitution, though its entry into force is delayed.",
    storyElements: [
        {
            text: "The Egyptian government issues a 'Basic Law' for the Gaza Strip.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The Egyptian government issues a 'Basic Law' for the Gaza Strip.",
                "A 'Basic Law' for the Gaza Strip is issued by the Egyptian government.",
                "The issuance of a 'Basic Law' for the Gaza Strip is done by the Egyptian government.",
                "For the Gaza Strip, a 'Basic Law' is put forth by the Egyptian government.",
            ],
        },
        {
            text: "It is intended to replace the Palestine Order in Council of 1922.",
            category: "purpose",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d29c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It is intended to replace the Palestine Order in Council of 1922.",
                "The Palestine Order in Council of 1922 is what the law is meant to replace.",
                "Its purpose is to take the place of the 1922 Palestine Order in Council.",
                "The replacement of the Palestine Order in Council of 1922 is the law's intention.",
            ],
        },
        {
            text: "The law enters into force only when it is published in the Gaza Official Gazette on 25 February 1958.",
            category: "delay",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The law enters into force only when it is published in the Gaza Official Gazette on 25 February 1958.",
                "Only on 25 February 1958, upon its publication in the Gaza Official Gazette, does the law come into effect.",
                "The entry into force of the law is delayed until its publication in the Gaza Official Gazette on 25 February 1958.",
                "It is not until 25 February 1958, with its publication in the Gaza Official Gazette, that the law becomes effective.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "to replace", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "but its entry into force is", color: "#a1c4fd" },
    ],
    tags: ["Legal", "Institutional"],
    actors: ["Egypt Governmental"],
    locations: ["Egypt", "Gaza Strip"],
    related_places: [],
    dateOptions: [
        "11 May 1955",
        "25 February 1958",
        "11 May 1958",
        "11 May 1952",
    ],
    locationOptions: [
        "Gaza Strip",
        "Egypt",
        "Cairo",
        "Gaza City",
    ],
    outcomeOptions: [
        "Egypt issues a 'Basic Law' for Gaza to replace the British Mandate's constitution, though its entry into force is delayed.",
        "A 'Basic Law' for Gaza is issued by Egypt to replace the Mandate-era constitution, but it is not immediately enforced.",
        "The replacement for the British Mandate constitution in Gaza, a 'Basic Law' from Egypt, is issued but its implementation is postponed.",
        "While Egypt issues a 'Basic Law' for Gaza to succeed the British Mandate's constitution, its effective date is much later.",
    ],
  },
  //event53
  // Add this event object to your 'events.ts' file

{
    title: "Arab Information Center (AIC) Is Opened in New York",
    date: "15 June 1955",
    location: "New York, USA",
    outcome: "The Arab League opens an information center in New York, with Palestinians playing a key role in its operations and expansion.",
    storyElements: [
        {
            text: "The Arab League reopens an information office called the Arab Information Center (AIC) in New York.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The Arab League reopens an information office called the Arab Information Center (AIC) in New York.",
                "In New York, an information office known as the Arab Information Center (AIC) is reopened by the Arab League.",
                "The reopening of an information office in New York, the Arab Information Center (AIC), is done by the Arab League.",
                "An office for information, the Arab Information Center (AIC), is reopened in New York by the Arab League.",
            ],
        },
        {
            text: "It is envisioned as a public relations scheme to present Arab life and avoid constant mention of Palestine.",
            category: "strategy",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "It is envisioned as a public relations scheme to present Arab life and avoid constant mention of Palestine.",
                "The plan is for it to be a public relations effort to show Arab life and not always mention Palestine.",
                "As a public relations strategy, it is meant to present Arab life while avoiding the constant mention of Palestine.",
                "The vision for the center is a public relations campaign presenting Arab life and downplaying the mention of Palestine.",
            ],
        },
        {
            text: "Palestinians play a significant role in the center's operations and the opening of sister offices.",
            category: "role",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Palestinians play a significant role in the center's operations and the opening of sister offices.",
                "A significant role is played by Palestinians in the center's operations and the opening of other offices.",
                "In the operations of the center and the establishment of new offices, Palestinians have a major role.",
                "The running of the center and the opening of sister branches heavily involve Palestinians.",
            ],
        },
        {
            text: "In 1960, Fayez Sayigh will head all AIC offices in the US.",
            category: "leadership",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 80, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "In 1960, Fayez Sayigh will head all AIC offices in the US.",
                "Fayez Sayigh will become the head of all US AIC offices in 1960.",
                "The leadership of all AIC offices in the US will be taken by Fayez Sayigh in 1960.",
                "All AIC offices in the US will come under the direction of Fayez Sayigh in 1960.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which is envisioned as", color: "#c3cfe2" },
      { from: 0, to: 2, relationship: "in which", color: "#c3cfe2" },
      { from: 2, to: 3, relationship: "eventually leading to", color: "#d299c2" },
    ],
    tags: ["Diplomatic", "Policy-Program"],
    actors: ["Arab League Inter-Governmental", "Palestine Non-Governmental"],
    locations: ["USA"],
    related_places: [],
    dateOptions: [
        "15 June 1955",
        "3 March 1955",
        "15 July 1955",
        "15 June 1960",
    ],
    locationOptions: [
        "New York, USA",
        "Washington D.C., USA",
        "Chicago, USA",
        "San Francisco, USA",
    ],
    outcomeOptions: [
        "The Arab League opens an information center in New York, with Palestinians playing a key role in its operations and expansion.",
        "An information center is opened in New York by the Arab League, where Palestinians are central to its operations and growth.",
        "The opening of an Arab League information center in New York sees Palestinians take a leading role in its operation and expansion.",
        "With Palestinians in key roles, the Arab League opens an information center in New York that later expands.",
    ],
  },
//event54
// Add this event object to your 'events.ts' file

{
    title: "Palestine Arab Refugee Office (PARO) Is Opened in New York",
    date: "25 June 1955 - 15 January 1962",
    location: "New York, USA",
    outcome: "A Palestinian refugee office is opened with Iraqi funding, but closes after the new Iraqi government withdraws support.",
    storyElements: [
        {
            text: "Izzat Tannous opens the Palestine Arab Refugee Office (PARO) in New York.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Izzat Tannous opens the Palestine Arab Refugee Office (PARO) in New York.",
                "The opening of the Palestine Arab Refugee Office (PARO) in New York is done by Izzat Tannous.",
                "In New York, Izzat Tannous establishes the Palestine Arab Refugee Office (PARO).",
                "The Palestine Arab Refugee Office (PARO) is opened in New York by Izzat Tannous.",
            ],
        },
        {
            text: "The Iraqi government helps substantially to finance this new office.",
            category: "support",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The Iraqi government helps substantially to finance this new office.",
                "Substantial financial help for this new office comes from the Iraqi government.",
                "This new office is financed in large part by the Iraqi government.",
                "The government of Iraq provides significant funding for this new office.",
            ],
        },
        {
            text: "The PARO's mission is to defend the cause of the Arab inhabitants of Palestine.",
            category: "mission",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The PARO's mission is to defend the cause of the Arab inhabitants of Palestine.",
                "To defend the cause of Palestine's Arab inhabitants is the mission of the PARO.",
                "The mission of the PARO is the defense of the cause of the Arab inhabitants of Palestine.",
                "The defense of the Palestinian Arab cause is the stated mission of the PARO.",
            ],
        },
        {
            text: "The new republican government in Iraq discontinues its support, and the office does not survive.",
            category: "consequence",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The new republican government in Iraq discontinues its support, and the office does not survive.",
                "The office fails to survive after the new republican government in Iraq stops its support.",
                "After the new Iraqi republican government ends its support, the office cannot continue.",
                "The discontinuation of support by the new republican government in Iraq leads to the office's closure.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which is financed by", color: "#c3cfe2" },
      { from: 0, to: 2, relationship: "with a", color: "#c3cfe2" },
      { from: 1, to: 3, relationship: "but later", color: "#a1c4fd" },
    ],
    tags: ["Institutional", "Policy-Program"],
    actors: ["Palestine Non-Governmental", "Iraq Governmental"],
    locations: ["USA"],
    related_places: [],
    dateOptions: [
        "25 June 1955 - 15 January 1962",
        "25 June 1955 - 31 July 1958",
        "Late 1958 - 15 January 1962",
        "25 June 1956 - 15 January 1961",
    ],
    locationOptions: [
        "New York, USA",
        "Washington D.C., USA",
        "Baghdad, Iraq",
        "Beirut, Lebanon",
    ],
    outcomeOptions: [
        "A Palestinian refugee office is opened with Iraqi funding, but closes after the new Iraqi government withdraws support.",
        "An office for Palestinian refugees opens with funding from Iraq, but it shuts down when the new Iraqi government cuts funding.",
        "The withdrawal of support by the new Iraqi government leads to the closure of a Palestinian refugee office it had funded.",
        "A Palestinian refugee office, funded by Iraq, is forced to close after the new Iraqi government stops its financial support.",
    ],
  },
 //event55
  // Add this event object to your 'events.ts' file

{
    title: "Renewal of Egyptian-Israeli Clashes",
    date: "22 August 1955 - 4 September 1955",
    location: "Gaza Strip",
    outcome: "A cycle of attacks and counter-attacks culminates in a major Israeli raid and a UN-brokered ceasefire.",
    storyElements: [
        {
            text: "A shooting incident provokes an Israeli incursion and attack on an Egyptian position.",
            category: "trigger",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "A shooting incident provokes an Israeli incursion and attack on an Egyptian position.",
                "An Israeli incursion and attack on an Egyptian position is provoked by a shooting incident.",
                "A shooting incident leads to an Israeli attack and incursion on an Egyptian position.",
                "The provocation for an Israeli attack on an Egyptian position is a minor shooting incident.",
            ],
        },
        {
            text: "Palestinian guerrillas plant mines, causing the death of about 15 Israelis.",
            category: "escalation",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Palestinian guerrillas plant mines, causing the death of about 15 Israelis.",
                "The deaths of about 15 Israelis are caused by mines planted by Palestinian guerrillas.",
                "Mines planted by Palestinian guerrillas result in the death of approximately 15 Israelis.",
                "About 15 Israelis are killed by mines that were planted by Palestinian guerrillas.",
            ],
        },
        {
            text: "The Israeli army launches a raid on Khan Yunis and kills 72 Egyptian and Palestinian soldiers.",
            category: "retaliation",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The Israeli army launches a raid on Khan Yunis and kills 72 Egyptian and Palestinian soldiers.",
                "A raid on Khan Yunis by the Israeli army results in the death of 72 soldiers.",
                "72 Egyptian and Palestinian soldiers are killed in a raid on Khan Yunis by the Israeli army.",
                "The killing of 72 soldiers occurs during an Israeli army raid on Khan Yunis.",
            ],
        },
        {
            text: "A cease-fire is brokered by UN observers on 4 September.",
            category: "resolution",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "A cease-fire is brokered by UN observers on 4 September.",
                "On 4 September, UN observers broker a cease-fire.",
                "The brokering of a cease-fire by UN observers happens on 4 September.",
                "UN observers succeed in arranging a cease-fire on 4 September.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "provoking", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "provoking further", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "leading to", color: "#ff9a9e" },
    ],
    tags: ["Violence"],
    actors: ["Egypt Governmental", "Israel Governmental", "Palestine Non-Governmental"],
    locations: ["Egypt", "Gaza Strip", "Israel"],
    related_places: [],
    dateOptions: [
        "22 August 1955 - 4 September 1955",
        "31 August 1955 - 4 September 1955",
        "22 August 1955 - 1 September 1955",
        "22 August 1954 - 4 September 1954",
    ],
    locationOptions: [
        "Gaza Strip",
        "Khan Yunis",
        "Sinai Peninsula",
        "Suez Canal",
    ],
    outcomeOptions: [
        "A cycle of attacks and counter-attacks culminates in a major Israeli raid and a UN-brokered ceasefire.",
        "A major Israeli raid and a UN-brokered ceasefire are the culmination of a series of attacks and counter-attacks.",
        "The sequence of attacks and counter-attacks ends with a large Israeli raid and a ceasefire arranged by the UN.",
        "After a period of attacks and counter-attacks, a major Israeli raid occurs, followed by a UN-brokered ceasefire.",
    ],
  },
  //event56
  // Add this event object to your 'events.ts' file

{
    title: "Egypt Restricts Passage Through Strait of Tiran",
    date: "11 September 1955",
    location: "Strait of Tiran, Egypt",
    outcome: "Egypt announces a permit requirement for ships in the Strait of Tiran but does little to enforce it on neutral ships.",
    storyElements: [
        {
            text: "Egypt announces that all ships seeking to enter the Straits of Tiran must obtain Egyptian permits.",
            category: "announcement",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Egypt announces that all ships seeking to enter the Straits of Tiran must obtain Egyptian permits.",
                "An announcement is made by Egypt that ships entering the Straits of Tiran need Egyptian permits.",
                "The requirement of Egyptian permits for all ships entering the Straits of Tiran is announced by Egypt.",
                "Egypt declares that any ship wishing to enter the Straits of Tiran must first get an Egyptian permit.",
            ],
        },
        {
            text: "To avoid confrontation, Egypt makes little effort to prevent neutral ships from bringing cargo to Eilat.",
            category: "action",
            position: { x: 400, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "To avoid confrontation, Egypt makes little effort to prevent neutral ships from bringing cargo to Eilat.",
                "Egypt does not make much effort to stop neutral ships going to Eilat in order to avoid a confrontation.",
                "Little effort is made by Egypt to block neutral ships heading to Eilat, so as to avoid conflict.",
                "In an effort to prevent a confrontation, Egypt does little to stop neutral cargo ships bound for Eilat.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "however,", color: "#a1c4fd" },
    ],
    tags: ["Sanctions"],
    actors: ["Egypt Governmental"],
    locations: ["Egypt"],
    related_places: [],
    dateOptions: [
        "11 September 1955",
        "4 September 1955",
        "11 August 1955",
        "11 September 1954",
    ],
    locationOptions: [
        "Strait of Tiran, Egypt",
        "Suez Canal, Egypt",
        "Eilat, Israel",
        "Cairo, Egypt",
    ],
    outcomeOptions: [
        "Egypt announces a permit requirement for ships in the Strait of Tiran but does little to enforce it on neutral ships.",
        "A permit requirement is announced by Egypt for the Strait of Tiran, but it is not strictly enforced on neutral vessels.",
        "While announcing a permit requirement for the Strait of Tiran, Egypt does not put much effort into enforcing it on neutral ships.",
        "The announcement of a permit requirement for the Strait of Tiran by Egypt is followed by lax enforcement on neutral shipping.",
    ],
  },
  //event57
  // Add this event object to your 'events.ts' file

{
    title: "Egyptian-Czech Arms Deal",
    date: "27 September 1955",
    location: "Egypt",
    outcome: "Egypt secures a major arms deal with the Soviet bloc, leading Western powers to see the Tripartite Declaration as irrelevant and prompting Israeli war planning.",
    storyElements: [
        {
            text: "After failing to buy arms from the US, Nasser reaches an agreement with the Soviet Union.",
            category: "context",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "After failing to buy arms from the US, Nasser reaches an agreement with the Soviet Union.",
                "Nasser makes a deal with the Soviet Union after being unable to purchase arms from the US.",
                "An agreement with the Soviet Union is reached by Nasser following a failed attempt to buy US arms.",
                "The failure to acquire arms from the US leads Nasser to an agreement with the Soviet Union.",
            ],
        },
        {
            text: "The deal is signed with Czechoslovakia and includes over $250 million worth of Soviet weaponry.",
            category: "action",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The deal is signed with Czechoslovakia and includes over $250 million worth of Soviet weaponry.",
                "With Czechoslovakia, a deal is signed that includes more than $250 million in Soviet arms.",
                "Over $250 million of Soviet weapons are included in the deal, which is signed with Czechoslovakia.",
                "The signing of the deal with Czechoslovakia finalizes the purchase of over $250 million in Soviet arms.",
            ],
        },
        {
            text: "Western powers see the move as making the Tripartite Declaration irrelevant.",
            category: "reaction",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Western powers see the move as making the Tripartite Declaration irrelevant.",
                "The move is seen by Western powers as making the Tripartitie Declaration no longer relevant.",
                "The relevance of the Tripartite Declaration is seen as nullified by this move, according to Western powers.",
                "In the view of Western powers, this move renders the Tripartite Declaration irrelevant.",
            ],
        },
        {
            text: "Israel steps up war planning against Egypt.",
            category: "reaction",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 80, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Israel steps up war planning against Egypt.",
                "War planning against Egypt is increased by Israel.",
                "An intensification of war planning against Egypt is undertaken by Israel.",
                "Israel begins to accelerate its war planning against Egypt.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "resulting in", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "prompting", color: "#a1c4fd" },
      { from: 1, to: 3, relationship: "and", color: "#a1c4fd" },
    ],
    tags: ["Diplomatic"],
    actors: ["Egypt Governmental", "USSR Governmental", "Czechoslovakia Governmental", "USA Governmental", "Great Britain Governmental", "Israel Governmental"],
    locations: ["Egypt"],
    related_places: [],
    dateOptions: [
        "27 September 1955",
        "11 September 1955",
        "27 August 1955",
        "27 September 1954",
    ],
    locationOptions: [
        "Egypt",
        "Czechoslovakia",
        "Soviet Union",
        "United States",
    ],
    outcomeOptions: [
        "Egypt secures a major arms deal with the Soviet bloc, leading Western powers to see the Tripartite Declaration as irrelevant and prompting Israeli war planning.",
        "A major arms deal with the Soviet bloc is made by Egypt, causing the West to view the Tripartite Declaration as irrelevant and Israel to step up war plans.",
        "The consequence of Egypt's major Soviet bloc arms deal is that the West sees the Tripartite Declaration as irrelevant and Israel increases its war planning.",
        "Israeli war planning increases and the West dismisses the Tripartite Declaration after Egypt signs a major arms deal with the Soviet bloc.",
    ],
  },
  //event58
  // Add this event object to your 'events.ts' file

{
    title: "Egypt and Syria Sign a Mutual Defense Pact",
    date: "20 October 1955",
    location: "Damascus, Syria",
    outcome: "Egypt and Syria sign a mutual defense pact, agreeing that an attack on one is an attack on both.",
    storyElements: [
        {
            text: "Egypt and Syria sign a mutual defense pact.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 80, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Egypt and Syria sign a mutual defense pact.",
                "A mutual defense pact is signed by Egypt and Syria.",
                "The signing of a mutual defense pact between Egypt and Syria occurs.",
                "A pact for mutual defense is agreed upon and signed by Egypt and Syria.",
            ],
        },
        {
            text: "The pact considers 'any armed attack against either State...as an attack against both.'",
            category: "clause",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The pact considers 'any armed attack against either State...as an attack against both.'",
                "Under the pact, an armed attack on one state is considered an attack on both.",
                "The principle that an attack on one is an attack on both is a key part of the pact.",
                "The pact states that if one of the two states is attacked, it will be considered an attack on both.",
            ],
        },
        {
            text: "They undertake to assist each other with armed force to repel any attack.",
            category: "commitment",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "They undertake to assist each other with armed force to repel any attack.",
                "A commitment is made to help each other with armed force to fight off an attack.",
                "They pledge to provide mutual assistance with armed force in the event of an attack.",
                "To repel an attack, they promise to assist one another with their armed forces.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which states", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "and commits them to", color: "#a1c4fd" },
    ],
    tags: ["Diplomatic", "Legal"],
    actors: ["Egypt Governmental", "Syria Governmental"],
    locations: ["Egypt", "Syria"],
    related_places: [],
    dateOptions: [
        "20 October 1955",
        "27 September 1955",
        "20 September 1955",
        "20 October 1954",
    ],
    locationOptions: [
        "Damascus, Syria",
        "Cairo, Egypt",
        "Amman, Jordan",
        "Beirut, Lebanon",
    ],
    outcomeOptions: [
        "Egypt and Syria sign a mutual defense pact, agreeing that an attack on one is an attack on both.",
        "A mutual defense pact is signed by Egypt and Syria, establishing that an attack on one is an attack on both.",
        "The principle that an attack on one is an attack on both is central to a new mutual defense pact between Egypt and Syria.",
        "A new mutual defense pact is signed by Egypt and Syria, which includes the clause that an attack on one is an attack on both.",
    ],
  },
  //event59
  // Add this event object to your 'events.ts' file

{
    title: "Israeli Raid on Syria Followed by Egyptian-Israeli Confrontation Near al-Auja",
    date: "23 October 1955 - 3 November 1955",
    location: "Al-Auja Demilitarized Zone",
    outcome: "An Israeli raid on Syria triggers a series of escalating retaliatory attacks between Egypt and Israel in the al-Auja zone.",
    storyElements: [
        {
            text: "Israel raids Syrian territory to capture soldiers and to test the Egyptian-Syrian defense pact.",
            category: "trigger",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Israel raids Syrian territory to capture soldiers and to test the Egyptian-Syrian defense pact.",
                "A raid on Syrian territory is launched by Israel to capture soldiers and test the defense pact.",
                "To test the Egyptian-Syrian defense pact and capture soldiers, Israel raids Syrian territory.",
                "The Israeli raid on Syria has two goals: capturing soldiers and testing the defense pact.",
            ],
        },
        {
            text: "Egypt attacks the al-Auja demilitarized zone, killing one Israeli and capturing two.",
            category: "retaliation",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Egypt attacks the al-Auja demilitarized zone, killing one Israeli and capturing two.",
                "An attack on the al-Auja demilitarized zone by Egypt results in one Israeli killed and two captured.",
                "In the al-Auja demilitarized zone, an Egyptian attack kills one Israeli and leads to two being captured.",
                "One Israeli is killed and two are captured in an Egyptian attack on the al-Auja demilitarized zone.",
            ],
        },
        {
            text: "Israeli paratroopers retaliate in Kuntilla, killing 10 Egyptian soldiers and capturing 29.",
            category: "retaliation",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Israeli paratroopers retaliate in Kuntilla, killing 10 Egyptian soldiers and capturing 29.",
                "A retaliation by Israeli paratroopers in Kuntilla kills 10 Egyptian soldiers and captures 29.",
                "In Kuntilla, Israeli paratroopers retaliate, which results in 10 dead and 29 captured Egyptian soldiers.",
                "10 Egyptian soldiers are killed and 29 are captured during a retaliation by Israeli paratroopers in Kuntilla.",
            ],
        },
        {
            text: "Israel resumes its attack in al-Auja, killing 70 Egyptian soldiers and imprisoning 49.",
            category: "escalation",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Israel resumes its attack in al-Auja, killing 70 Egyptian soldiers and imprisoning 49.",
                "A renewed attack by Israel in al-Auja kills 70 Egyptian soldiers and captures 49.",
                "In al-Auja, the Israeli attack resumes, leading to 70 dead and 49 imprisoned Egyptian soldiers.",
                "70 Egyptian soldiers are killed and 49 are imprisoned when Israel resumes its attack in al-Auja.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "prompting", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "prompting", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "leading to", color: "#ff9a9e" },
    ],
    tags: ["Violence"],
    actors: ["Egypt Governmental", "Israel Governmental", "Syria Governmental"],
    locations: ["Egypt", "Israel", "Syria"],
    related_places: [],
    dateOptions: [
        "23 October 1955 - 3 November 1955",
        "26 October 1955 - 28 October 1955",
        "3 November 1955",
        "23 October 1954 - 3 November 1954",
    ],
    locationOptions: [
        "Al-Auja Demilitarized Zone",
        "Kuntilla Sector",
        "Syrian territory",
        "Damascus, Syria",
    ],
    outcomeOptions: [
        "An Israeli raid on Syria triggers a series of escalating retaliatory attacks between Egypt and Israel in the al-Auja zone.",
        "A sequence of escalating retaliatory attacks between Egypt and Israel in al-Auja is started by an Israeli raid on Syria.",
        "The trigger for a series of escalating retaliations between Egypt and Israel in al-Auja is an Israeli raid on Syria.",
        "In the al-Auja zone, an Israeli raid on Syria leads to a chain of escalating retaliatory attacks between Egypt and Israel.",
    ],
  },
  //event60
  // Add this event object to your 'events.ts' file

{
    title: "David Ben-Gurion Replaces Moshe Sharett as Prime Minister",
    date: "3 November 1955",
    location: "Israel",
    outcome: "Following the election, David Ben-Gurion of the Mapai party becomes Prime Minister of Israel.",
    storyElements: [
        {
            text: "Following the 26 July election, David Ben-Gurion assumes the position of Prime Minister.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Following the 26 July election, David Ben-Gurion assumes the position of Prime Minister.",
                "David Ben-Gurion becomes Prime Minister after the election on 26 July.",
                "The position of Prime Minister is taken by David Ben-Gurion after the 26 July election.",
                "After the election held on 26 July, the new Prime Minister is David Ben-Gurion.",
            ],
        },
        {
            text: "He is the leader of the Mapai party.",
            category: "detail",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "He is the leader of the Mapai party.",
                "The Mapai party is led by him.",
                "His position is the leader of the Mapai party.",
                "As the leader of the Mapai party, he becomes Prime Minister.",
            ],
        },
        {
            text: "Mapai secures 32.2 percent of the votes and 40 seats.",
            category: "detail",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Mapai secures 32.2 percent of the votes and 40 seats.",
                "32.2 percent of the votes and 40 seats are won by Mapai.",
                "The result for Mapai is 32.2 percent of the votes and 40 seats.",
                "With 32.2 percent of the vote, Mapai wins 40 seats in the Knesset.",
            ],
        },
    ],
    storyConnections: [
      { from: 1, to: 0, relationship: "leader of", color: "#d299c2" },
      { from: 2, to: 0, relationship: "which allows", color: "#ff9a9e" },
    ],
    tags: ["Biographical"],
    actors: ["Israel Governmental"],
    locations: ["Israel"],
    related_places: [],
    dateOptions: [
        "3 November 1955",
        "26 July 1955",
        "3 October 1955",
        "3 November 1954",
    ],
    locationOptions: [
        "Israel",
        "Jerusalem",
        "Tel Aviv",
        "Haifa",
    ],
    outcomeOptions: [
        "Following the election, David Ben-Gurion of the Mapai party becomes Prime Minister of Israel.",
        "David Ben-Gurion, from the Mapai party, is made Prime Minister of Israel after the election.",
        "The role of Prime Minister of Israel is taken by David Ben-Gurion of the Mapai party post-election.",
        "After the election, Israel's new Prime Minister is David Ben-Gurion from the Mapai party.",
    ],
  },
  //event61
// Add this event object to your 'events.ts' file

{
    title: "Israeli Attack on Syria (Operation Olive Leaves)",
    date: "10 December 1955 - 11 December 1955",
    location: "Syria",
    outcome: "Israel attacks a Syrian position, killing 56, claiming it was in response to interference with fishing boats, a claim disputed by the UN.",
    storyElements: [
        {
            text: "Israel attacks a Syrian position overnight, killing 56 Syrians and taking 30 prisoners.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Israel attacks a Syrian position overnight, killing 56 Syrians and taking 30 prisoners.",
                "An overnight attack on a Syrian position by Israel kills 56 Syrians and captures 30.",
                "56 Syrians are killed and 30 are taken prisoner in an overnight Israeli attack on a Syrian position.",
                "The result of an overnight Israeli attack on a Syrian position is 56 dead and 30 captured Syrians.",
            ],
        },
        {
            text: "Israel claims its attack was in response to Syrian interference with Israeli fishing boats.",
            category: "justification",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Israel claims its attack was in response to Syrian interference with Israeli fishing boats.",
                "The claim made by Israel is that the attack was a response to Syrian interference with its fishing boats.",
                "According to Israel, the attack was a retaliation for Syrian interference with its fishing boats.",
                "The reason given by Israel for the attack is Syrian interference with its fishing boats.",
            ],
        },
        {
            text: "The UN Truce Supervision Organization states that no Israeli fishing boat had been fired at.",
            category: "dispute",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The UN Truce Supervision Organization states that no Israeli fishing boat had been fired at.",
                "According to the UN Truce Supervision Organization, no Israeli fishing boat was fired upon.",
                "The UN Truce Supervision Organization's report says that no Israeli fishing boat had been a target of fire.",
                "A statement from the UN Truce Supervision Organization indicates that no Israeli fishing boat was shot at.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "claiming it was a response to", color: "#ff9a9e" },
      { from: 1, to: 2, relationship: "but", color: "#a1c4fd" },
    ],
    tags: ["Violence"],
    actors: ["Israel Governmental", "Syria Governmental", "UN Inter-Governmental"],
    locations: ["Israel", "Syria"],
    related_places: [],
    dateOptions: [
        "10 December 1955 - 11 December 1955",
        "3 November 1955",
        "10 November 1955 - 11 November 1955",
        "10 December 1954 - 11 December 1954",
    ],
    locationOptions: [
        "Syria",
        "Lake Tiberias",
        "Golan Heights",
        "Damascus",
    ],
    outcomeOptions: [
        "Israel attacks a Syrian position, killing 56, claiming it was in response to interference with fishing boats, a claim disputed by the UN.",
        "An Israeli attack on a Syrian position kills 56, with Israel's claim of it being a reprisal for interference with fishing boats disputed by the UN.",
        "A UN-disputed claim of interference with fishing boats is given by Israel as the reason for an attack on a Syrian position that killed 56.",
        "56 Syrians are killed in an Israeli attack on a Syrian position, which Israel claimed was a response to interference with fishing boats, but the UN disputed this.",
    ],
  },

  //event62

  // Add this event object to your 'events.ts' file

{
    title: "Security Council Resolution S/RES/111",
    date: "19 January 1956",
    location: "New York, USA",
    outcome: "The UN condemns Israel's attack on Syria as a flagrant violation and warns of further measures if obligations are not met.",
    storyElements: [
        {
            text: "The resolution condemns Israel's attack on Syria as a flagrant violation of the cease-fire.",
            category: "condemnation",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The resolution condemns Israel's attack on Syria as a flagrant violation of the cease-fire.",
                "Israel's attack on Syria is condemned by the resolution as a flagrant cease-fire violation.",
                "A condemnation of Israel's attack on Syria as a flagrant violation of the cease-fire is issued.",
                "The resolution issues a condemnation of the Israeli attack on Syria, calling it a flagrant cease-fire violation.",
            ],
        },
        {
            text: "It is also a violation of the Israel-Syria Armistice Agreement and the UN Charter.",
            category: "violation",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "It is also a violation of the Israel-Syria Armistice Agreement and the UN Charter.",
                "A violation of the Israel-Syria Armistice Agreement and the UN Charter is also what the attack constitutes.",
                "The attack also violates the Armistice Agreement between Israel and Syria and the UN Charter.",
                "The UN Charter and the Israel-Syria Armistice Agreement are also violated by the attack.",
            ],
        },
        {
            text: "It calls upon Israel to comply with its obligations in the future.",
            category: "call_to_action",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It calls upon Israel to comply with its obligations in the future.",
                "A call is made for Israel to comply with its future obligations.",
                "Israel is called upon to meet its obligations going forward.",
                "The resolution demands that Israel adhere to its obligations in the future.",
            ],
        },
        {
            text: "It warns that the Council will consider 'further measures' if Israel fails to comply.",
            category: "warning",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "It warns that the Council will consider 'further measures' if Israel fails to comply.",
                "A warning is issued that 'further measures' will be considered by the Council if Israel does not comply.",
                "If Israel fails to comply, the Council warns it will have to consider 'further measures'.",
                "The Council's warning states that 'further measures' will be considered upon Israel's failure to comply.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "and a", color: "#ff9a9e" },
      { from: 0, to: 2, relationship: "and calls for", color: "#ff9a9e" },
      { from: 2, to: 3, relationship: "warning that", color: "#d299c2" },
    ],
    tags: ["Diplomatic", "Violence"],
    actors: ["UN Inter-Governmental", "Israel Governmental", "Syria Governmental"],
    locations: [],
    related_places: [],
    dateOptions: [
        "19 January 1956",
        "11 December 1955",
        "19 December 1955",
        "19 January 1955",
    ],
    locationOptions: [
        "New York, USA",
        "Damascus, Syria",
        "Jerusalem",
        "Golan Heights",
    ],
    outcomeOptions: [
        "The UN condemns Israel's attack on Syria as a flagrant violation and warns of further measures if obligations are not met.",
        "A condemnation of Israel's attack on Syria as a flagrant violation is issued by the UN, with a warning of more measures for non-compliance.",
        "Israel's attack on Syria is condemned as a flagrant violation by the UN, which also warns of further measures if obligations are ignored.",
        "The UN's condemnation of Israel's attack on Syria as a flagrant violation is accompanied by a warning of further measures for non-compliance.",
    ],
  },
//event63
// Add this event object to your 'events.ts' file

{
    title: "Clashes Across Gaza Borders",
    date: "2 April 1956 - 14 April 1956",
    location: "Gaza Strip, Israel",
    outcome: "Fedayeen operations from Gaza lead to Israeli bombardment, resulting in numerous casualties on both sides.",
    storyElements: [
        {
            text: "Fedayeen from Gaza undertake operations south of Israel.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Fedayeen from Gaza undertake operations south of Israel.",
                "Operations south of Israel are undertaken by fedayeen from Gaza.",
                "From Gaza, fedayeen carry out operations in southern Israel.",
                "South of Israel, operations are conducted by fedayeen based in Gaza.",
            ],
        },
        {
            text: "These operations are followed by Israeli bombardment of the Strip.",
            category: "retaliation",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "These operations are followed by Israeli bombardment of the Strip.",
                "Israeli bombardment of the Strip follows these operations.",
                "The Strip is bombarded by Israel in response to these operations.",
                "Following the operations, Israel bombards the Gaza Strip.",
            ],
        },
        {
            text: "The clashes result in the death of more than 50 Palestinians and 8 Israelis.",
            category: "consequence",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The clashes result in the death of more than 50 Palestinians and 8 Israelis.",
                "More than 50 Palestinians and 8 Israelis are killed in the clashes.",
                "The death toll from the clashes is over 50 Palestinians and 8 Israelis.",
                "As a result of the clashes, over 50 Palestinians and 8 Israelis die.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "provoking", color: "#ff9a9e" },
      { from: 1, to: 2, relationship: "resulting in", color: "#a1c4fd" },
    ],
    tags: ["Violence"],
    actors: ["Palestine Non-Governmental", "Israel Governmental"],
    locations: ["Gaza Strip", "Israel"],
    related_places: [],
    dateOptions: [
        "2 April 1956 - 14 April 1956",
        "19 January 1956 - 2 April 1956",
        "14 April 1956 - 30 April 1956",
        "2 April 1955 - 14 April 1955",
    ],
    locationOptions: [
        "Gaza Strip, Israel",
        "Suez Canal, Egypt",
        "The West Bank, Jordan",
        "Syria",
    ],
    outcomeOptions: [
        "Fedayeen operations from Gaza lead to Israeli bombardment, resulting in numerous casualties on both sides.",
        "Israeli bombardment and numerous casualties follow fedayeen operations from Gaza.",
        "Numerous casualties on both sides are the result of fedayeen operations from Gaza and subsequent Israeli bombardment.",
        "After fedayeen operations from Gaza, Israeli bombardment occurs, leading to many casualties on both sides.",
    ],
  },
  //event64

  // Add this event object to your 'events.ts' file

{
    title: "24th Zionist Congress Is Held in Jerusalem",
    date: "24 April 1956 - 7 May 1956",
    location: "Jerusalem",
    outcome: "The Zionist Congress condemns Arab armament and boycotts, calls for worldwide Jewish support for Israel, and demands policies to encourage mass immigration.",
    storyElements: [
        {
            text: "The Zionist Congress condemns the Arab states' armament and the 'organized Arab economic boycott.'",
            category: "condemnation",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The Zionist Congress condemns the Arab states' armament and the 'organized Arab economic boycott.'",
                "A condemnation of Arab armament and the 'organized Arab economic boycott' is issued by the Zionist Congress.",
                "The 'organized Arab economic boycott' and Arab armament are condemned by the Zionist Congress.",
                "The Zionist Congress issues a condemnation of both Arab armament and the 'organized Arab economic boycott'.",
            ],
        },
        {
            text: "It expresses its strong support of Israel.",
            category: "affirmation",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 80, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "It expresses its strong support of Israel.",
                "Strong support for Israel is expressed by the congress.",
                "The congress conveys its strong support for the state of Israel.",
                "An expression of strong support for Israel is made by the congress.",
            ],
        },
        {
            text: "It calls 'on the Jews throughout the world to fulfill their responsibility towards the State of Israel.'",
            category: "call_to_action",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It calls 'on the Jews throughout the world to fulfill their responsibility towards the State of Israel.'",
                "A call is made for Jews worldwide to fulfill their responsibility to Israel.",
                "The congress calls on Jews everywhere to meet their responsibility to the State of Israel.",
                "The fulfillment of their responsibility to Israel by Jews all over the world is called for.",
            ],
        },
        {
            text: "It demands the creation of a regime of absorption that 'will encourage the immigration of Jewish masses.'",
            category: "demand",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "It demands the creation of a regime of absorption that 'will encourage the immigration of Jewish masses.'",
                "The creation of an absorption regime to encourage mass Jewish immigration is demanded.",
                "A demand is made for a regime of absorption that will foster the immigration of Jewish masses.",
                "The congress demands a system of absorption designed to encourage mass Jewish immigration.",
            ],
        },
    ],
    storyConnections: [
      { from: 1, to: 0, relationship: "and condemns", color: "#a1c4fd" },
      { from: 1, to: 2, relationship: "and calls on", color: "#a1c4fd" },
      { from: 1, to: 3, relationship: "and demands", color: "#a1c4fd" },
    ],
    tags: ["Institutional", "Colonization"],
    actors: ["Zionists Quasi-Governmental"],
    locations: ["Israel", "Jerusalem"],
    related_places: [],
    dateOptions: [
        "24 April 1956 - 7 May 1956",
        "2 April 1956 - 14 April 1956",
        "24 May 1956 - 7 June 1956",
        "24 April 1955 - 7 May 1955",
    ],
    locationOptions: [
        "Jerusalem",
        "Tel Aviv",
        "Haifa",
        "The West Bank",
    ],
    outcomeOptions: [
        "The Zionist Congress condemns Arab armament and boycotts, calls for worldwide Jewish support for Israel, and demands policies to encourage mass immigration.",
        "Condemnation of Arab armament and boycotts, a call for worldwide Jewish support, and a demand for policies to encourage mass immigration are made by the Zionist Congress.",
        "The Zionist Congress issues a condemnation of Arab boycotts, a call for support from Jews globally, and a demand for mass immigration policies.",
        "A call for global Jewish support, condemnation of Arab armament, and a demand for mass immigration policies are the results of the Zionist Congress.",
    ],
  },
  //event65

  // Add this event object to your 'events.ts' file

{
    title: "Egypt Blocks Greek Freighter",
    date: "25 May 1956",
    location: "Suez Canal, Egypt",
    outcome: "Egypt prevents a Greek vessel traveling between Israeli ports from using the Suez Canal, a change in policy.",
    storyElements: [
        {
            text: "Egypt prevents the Greek vessel Pannegia from traveling through the Suez Canal.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Egypt prevents the Greek vessel Pannegia from traveling through the Suez Canal.",
                "The Greek vessel Pannegia is prevented from using the Suez Canal by Egypt.",
                "Passage through the Suez Canal is denied to the Greek vessel Pannegia by Egypt.",
                "Egypt stops the Greek vessel Pannegia from making its journey through the Suez Canal.",
            ],
        },
        {
            text: "The ship was carrying a cargo of cement from Haifa to Eilat.",
            category: "detail",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The ship was carrying a cargo of cement from Haifa to Eilat.",
                "A cargo of cement was being transported by the ship from Haifa to Eilat.",
                "From Haifa to Eilat, the vessel was carrying a load of cement.",
                "The ship's cargo was cement, and its route was from Haifa to Eilat.",
            ],
        },
        {
            text: "Previously, Egypt had allowed neutral vessels to carry cargo between Israeli ports.",
            category: "context",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Previously, Egypt had allowed neutral vessels to carry cargo between Israeli ports.",
                "Neutral vessels carrying cargo between Israeli ports had been allowed by Egypt before.",
                "Before this, Egypt permitted neutral ships to transport cargo between Israeli ports.",
                "The prior policy of Egypt was to allow neutral vessels to carry cargo between Israeli ports.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which was", color: "#ff9a9e" },
      { from: 0, to: 2, relationship: "reversing policy where", color: "#ff9a9e" },
    ],
    tags: ["Sanctions"],
    actors: ["Egypt Governmental", "Greece Non-Governmental"],
    locations: ["Egypt"],
    related_places: [],
    dateOptions: [
        "25 May 1956",
        "7 May 1956",
        "25 June 1956",
        "25 May 1955",
    ],
    locationOptions: [
        "Suez Canal, Egypt",
        "Haifa, Israel",
        "Eilat, Israel",
        "Strait of Tiran, Egypt",
    ],
    outcomeOptions: [
        "Egypt prevents a Greek vessel traveling between Israeli ports from using the Suez Canal, a change in policy.",
        "A change in policy is marked by Egypt blocking a Greek ship that was sailing between Israeli ports via the Suez Canal.",
        "The blocking of a Greek vessel traveling between Israeli ports in the Suez Canal signals a new Egyptian policy.",
        "Egypt's new policy is shown when it stops a Greek ship from using the Suez Canal for a journey between Israeli ports.",
    ],
  },
  //event66

  // Add this event object to your 'events.ts' file

{
    title: "France and Israel Sign Arms Deal and Prepare for War",
    date: "22 June 1956 - 29 July 1956",
    location: "France",
    outcome: "France and Israel sign a major arms deal and begin planning for war against Egypt, disregarding the Tripartite Declaration.",
    storyElements: [
        {
            text: "Dayan and Peres visit France to sign an arms deal worth $80 million.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Dayan and Peres visit France to sign an arms deal worth $80 million.",
                "An $80 million arms deal is signed by Dayan and Peres during a visit to France.",
                "The signing of an $80 million arms deal is completed by Dayan and Peres in France.",
                "In France, Dayan and Peres finalize an arms deal valued at $80 million.",
            ],
        },
        {
            text: "The deal is part of an emerging anti-Egyptian military alliance that disregards the Tripartite Declaration.",
            category: "context",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 120, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The deal is part of an emerging anti-Egyptian military alliance that disregards the Tripartite Declaration.",
                "As part of a new anti-Egyptian military alliance, the deal ignores the Tripartite Declaration.",
                "The Tripartite Declaration is disregarded by this deal, which is part of a new anti-Egyptian military alliance.",
                "This deal, which ignores the Tripartite Declaration, is a component of an emerging anti-Egyptian military alliance.",
            ],
        },
        {
            text: "Israel and France draw up war plans against Egypt.",
            category: "planning",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Israel and France draw up war plans against Egypt.",
                "War plans against Egypt are drawn up by Israel and France.",
                "The drawing up of war plans against Egypt is done by Israel and France.",
                "A collaboration between Israel and France results in the creation of war plans against Egypt.",
            ],
        },
        {
            text: "The French cabinet decides to take military action against Egypt in alliance with Israel.",
            category: "decision",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The French cabinet decides to take military action against Egypt in alliance with Israel.",
                "A decision is made by the French cabinet for military action against Egypt, allied with Israel.",
                "In alliance with Israel, the French cabinet resolves to take military action against Egypt.",
                "The French cabinet's decision is to proceed with military action against Egypt in partnership with Israel.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "as part of", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "leading to", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "culminating in", color: "#d299c2" },
    ],
    tags: ["Diplomatic", "Policy-Program"],
    actors: ["Israel Governmental", "France Governmental", "USA Governmental", "Egypt Governmental"],
    locations: ["France", "Israel", "Egypt"],
    related_places: [],
    dateOptions: [
        "22 June 1956 - 29 July 1956",
        "22 May 1956 - 29 June 1956",
        "29 July 1956",
        "22 June 1955 - 29 July 1955",
    ],
    locationOptions: [
        "France",
        "Israel",
        "Egypt",
        "United States",
    ],
    outcomeOptions: [
        "France and Israel sign a major arms deal and begin planning for war against Egypt, disregarding the Tripartite Declaration.",
        "A major arms deal is signed between France and Israel, who then start to plan for war against Egypt, ignoring the Tripartite Declaration.",
        "The signing of a major arms deal and the start of war planning against Egypt by France and Israel occurs, in disregard of the Tripartite Declaration.",
        "Ignoring the Tripartite Declaration, France and Israel sign a significant arms deal and commence planning for war against Egypt.",
    ],
  },
  //event67

  // Add this event object to your 'events.ts' file

{
    title: "US Withdraws Aswan Funding",
    date: "19 July 1956",
    location: "USA",
    outcome: "The US withdraws its offer to fund the Aswan High Dam, an offer originally made to counter Soviet influence.",
    storyElements: [
        {
            text: "The US announces it is withdrawing its offer of $56 million for the Aswan High Dam.",
            category: "action",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The US announces it is withdrawing its offer of $56 million for the Aswan High Dam.",
                "An announcement is made by the US that it is retracting its $56 million offer for the Aswan High Dam.",
                "The withdrawal of the US offer of $56 million for the Aswan High Dam is announced.",
                "A US announcement states that the $56 million offer for the Aswan High Dam is being withdrawn.",
            ],
        },
        {
            text: "The offer was originally made in December 1955 after the Egyptian-Czech arms deal.",
            category: "context",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The offer was originally made in December 1955 after the Egyptian-Czech arms deal.",
                "Originally, the offer was made in December 1955 following the Egyptian-Czech arms deal.",
                "The initial offer was made in December 1955, subsequent to the Egyptian-Czech arms deal.",
                "After the Egyptian-Czech arms deal, the offer was first proposed in December 1955.",
            ],
        },
        {
            text: "The US offer was an attempt to counteract growing Soviet influence in Egypt.",
            category: "motive",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The US offer was an attempt to counteract growing Soviet influence in Egypt.",
                "An attempt to counter the growing Soviet influence in Egypt was the reason for the US offer.",
                "The US made the offer in an effort to counteract the increasing Soviet influence in Egypt.",
                "To counter the rise of Soviet influence in Egypt was the goal of the US offer.",
            ],
        },
    ],
    storyConnections: [
      { from: 1, to: 2, relationship: "as an", color: "#f5f7fa" },
      { from: 2, to: 0, relationship: "but later", color: "#a1c4fd" },
    ],
    tags: ["Sanctions", "Diplomatic"],
    actors: ["USA Governmental", "Egypt Governmental"],
    locations: ["USA", "Egypt"],
    related_places: [],
    dateOptions: [
        "19 July 1956",
        "26 July 1956",
        "December 1955",
        "19 July 1955",
    ],
    locationOptions: [
        "Washington D.C., USA",
        "Cairo, Egypt",
        "Aswan, Egypt",
        "Moscow, USSR",
    ],
    outcomeOptions: [
        "The US withdraws its offer to fund the Aswan High Dam, an offer originally made to counter Soviet influence.",
        "An offer to fund the Aswan High Dam, made to counter Soviet influence, is withdrawn by the US.",
        "The withdrawal of the US offer to fund the Aswan High Dam occurs, which was initially made to counter Soviet influence.",
        "To counter Soviet influence, the US had made an offer to fund the Aswan High Dam, but this offer is now withdrawn.",
    ],
  },
  //event68
  // Add this event object to your 'events.ts' file

{
    title: "Israeli-Jordanian Clashes",
    date: "25 July 1956 - 21 August 1956",
    location: "Jerusalem Area",
    outcome: "A series of escalating clashes, ambushes, and cross-border incidents occur between Israeli and Jordanian forces and militants.",
    storyElements: [
        {
            text: "An exchange of fire between Jordanian and Israeli troops occurs in the Jerusalem area.",
            category: "clash",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "An exchange of fire between Jordanian and Israeli troops occurs in the Jerusalem area.",
                "In the Jerusalem area, an exchange of fire happens between Jordanian and Israeli troops.",
                "Jordanian and Israeli troops exchange fire in the vicinity of Jerusalem.",
                "The Jerusalem area is the scene of an exchange of fire between Jordanian and Israeli forces.",
            ],
        },
        {
            text: "Eight days later, Israeli soldiers fire on a Jordanian patrol, killing 2 national guardsmen.",
            category: "clash",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Eight days later, Israeli soldiers fire on a Jordanian patrol, killing 2 national guardsmen.",
                "A Jordanian patrol is fired on by Israeli soldiers eight days later, killing 2 national guardsmen.",
                "The killing of 2 national guardsmen occurs when Israeli soldiers fire on a Jordanian patrol a week later.",
                "Two national guardsmen are killed when Israeli soldiers open fire on a Jordanian patrol after eight days.",
            ],
        },
        {
            text: "Militants from Jordan ambush a bus and two jeeps, killing 3 Israeli soldiers and a woman.",
            category: "clash",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Militants from Jordan ambush a bus and two jeeps, killing 3 Israeli soldiers and a woman.",
                "An ambush on a bus and two jeeps by militants from Jordan results in 4 Israeli deaths.",
                "3 Israeli soldiers and a woman are killed in an ambush on a bus and two jeeps by militants from Jordan.",
                "The killing of 3 Israeli soldiers and a woman happens during an ambush by militants from Jordan.",
            ],
        },
        {
            text: "An Israeli patrol crosses the border in the Jenin area, resulting in casualties on both sides.",
            category: "clash",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "An Israeli patrol crosses the border in the Jenin area, resulting in casualties on both sides.",
                "In the Jenin area, an Israeli patrol crosses the border, leading to casualties on both sides.",
                "Casualties on both sides are the result of an Israeli patrol crossing the border in the Jenin area.",
                "A border crossing by an Israeli patrol in the Jenin area leads to casualties for both sides.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "followed by", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "followed by", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "followed by", color: "#ff9a9e" },
    ],
    tags: ["Violence", "Popular action"],
    actors: ["Jordan Governmental", "Israel Governmental", "Palestine Non-Governmental"],
    locations: ["Jerusalem", "Jordan", "Israel", "West Bank"],
    related_places: [],
    dateOptions: [
        "25 July 1956 - 21 August 1956",
        "19 July 1956 - 25 July 1956",
        "16 August 1956 - 21 August 1956",
        "25 July 1955 - 21 August 1955",
    ],
    locationOptions: [
        "Jerusalem area",
        "Eilat road",
        "Jenin area",
        "Amman, Jordan",
    ],
    outcomeOptions: [
        "A series of escalating clashes, ambushes, and cross-border incidents occur between Israeli and Jordanian forces and militants.",
        "Escalating clashes, including ambushes and border crossings, take place between Israeli and Jordanian forces and militants.",
        "Between Israeli and Jordanian forces and militants, a sequence of escalating clashes, ambushes, and cross-border events unfolds.",
        "A number of escalating clashes, ambushes, and border incidents happen between Israeli and Jordanian forces and militants.",
    ],
  },
//event69

// Add this event object to your 'events.ts' file

{
    title: "Nationalization of the Suez Canal",
    date: "26 July 1956",
    location: "Alexandria, Egypt",
    outcome: "Nasser nationalizes the Suez Canal Company, angering Britain and France, and declares the revenue will fund the Aswan Dam.",
    storyElements: [
        {
            text: "President Nasser announces that Egypt has nationalized the Suez Canal Company.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "President Nasser announces that Egypt has nationalized the Suez Canal Company.",
                "The nationalization of the Suez Canal Company by Egypt is announced by President Nasser.",
                "An announcement is made by President Nasser that the Suez Canal Company has been nationalized by Egypt.",
                "President Nasser declares that the Suez Canal Company is now nationalized by the Egyptian state.",
            ],
        },
        {
            text: "All company assets are frozen, and stockholders would be compensated.",
            category: "provision",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "All company assets are frozen, and stockholders would be compensated.",
                "The freezing of all company assets occurs, with compensation for stockholders.",
                "Stockholders are to be compensated, and all company assets are frozen.",
                "A freeze is placed on all company assets, and compensation for stockholders is promised.",
            ],
        },
        {
            text: "The British government and French stockholders react angrily to the decision.",
            category: "reaction",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The British government and French stockholders react angrily to the decision.",
                "An angry reaction to the decision comes from the British government and French stockholders.",
                "The decision is met with an angry reaction from French stockholders and the British government.",
                "French stockholders and the British government are angered by the decision and react accordingly.",
            ],
        },
        {
            text: "Nasser declares that nationalization will help fund construction of the Aswan High Dam.",
            category: "justification",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Nasser declares that nationalization will help fund construction of the Aswan High Dam.",
                "A declaration is made by Nasser that the Aswan High Dam's construction will be funded by the nationalization.",
                "To help fund the Aswan High Dam, Nasser declares the canal's nationalization.",
                "The funding for the Aswan High Dam's construction is cited by Nasser as the reason for nationalization.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "whereby", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "prompting", color: "#a1c4fd" },
      { from: 0, to: 3, relationship: "justifying it as a way to", color: "#a1c4fd" },
    ],
    tags: ["Sanctions", "Social-Economic"],
    actors: ["Egypt Governmental", "Great Britain Governmental", "France Governmental"],
    locations: ["Egypt"],
    related_places: [],
    dateOptions: [
        "26 July 1956",
        "19 July 1956",
        "25 July 1956",
        "26 June 1956",
    ],
    locationOptions: [
        "Alexandria, Egypt",
        "Cairo, Egypt",
        "Suez Canal, Egypt",
        "London, Great Britain",
    ],
    outcomeOptions: [
        "Nasser nationalizes the Suez Canal Company, angering Britain and France, and declares the revenue will fund the Aswan Dam.",
        "The nationalization of the Suez Canal Company by Nasser angers Britain and France; he says the money will fund the Aswan Dam.",
        "Angering Britain and France, Nasser nationalizes the Suez Canal Company and pledges the revenue to the Aswan Dam project.",
        "To fund the Aswan Dam, Nasser nationalizes the Suez Canal Company, which causes an angry reaction from Britain and France.",
    ],
},
//event70
// Add this event object to your 'events.ts' file

{
    title: "London Conference on Suez",
    date: "16 August 1956 - 23 August 1956",
    location: "London, Great Britain",
    outcome: "A conference of 22 nations supports the internationalization of the Suez Canal and chooses a delegation to negotiate with Nasser.",
    storyElements: [
        {
            text: "Twenty-two nations meet in London to discuss the future of the Suez Canal.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Twenty-two nations meet in London to discuss the future of the Suez Canal.",
                "The future of the Suez Canal is discussed by 22 nations at a meeting in London.",
                "In London, 22 nations convene to discuss the future of the Suez Canal.",
                "A meeting of 22 nations is held in London to talk about the Suez Canal's future.",
            ],
        },
        {
            text: "The majority of attendees support the internationalization of the canal.",
            category: "agreement",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The majority of attendees support the internationalization of the canal.",
                "Support for the internationalization of the canal is expressed by most attendees.",
                "Most of the nations in attendance are in favor of internationalizing the canal.",
                "The internationalization of the canal is backed by a majority of the conference attendees.",
            ],
        },
        {
            text: "A delegation of 5 nations, led by Australian PM Robert Menzies, is chosen to negotiate with Nasser.",
            category: "decision",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "A delegation of 5 nations, led by Australian PM Robert Menzies, is chosen to negotiate with Nasser.",
                "To negotiate with Nasser, a 5-nation delegation led by Australian PM Robert Menzies is selected.",
                "The choice is made to send a 5-nation delegation, headed by Australian PM Robert Menzies, to negotiate with Nasser.",
                "A delegation of 5 nations with Australian PM Robert Menzies as its leader is picked to hold negotiations with Nasser.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "where", color: "#a1c4fd" },
      { from: 1, to: 2, relationship: "leading to", color: "#d299c2" },
    ],
    tags: ["Diplomatic"],
    actors: ["USA Governmental", "Great Britain Governmental", "Australia Governmental", "Egypt Governmental"],
    locations: ["Great Britain", "Egypt"],
    related_places: [],
    dateOptions: [
        "16 August 1956 - 23 August 1956",
        "26 July 1956 - 16 August 1956",
        "23 August 1956 - 1 September 1956",
        "16 August 1955 - 23 August 1955",
    ],
    locationOptions: [
        "London, Great Britain",
        "Cairo, Egypt",
        "Washington D.C., USA",
        "Paris, France",
    ],
    outcomeOptions: [
        "A conference of 22 nations supports the internationalization of the Suez Canal and chooses a delegation to negotiate with Nasser.",
        "The internationalization of the Suez Canal is supported by a 22-nation conference, which also selects a delegation to negotiate with Nasser.",
        "A delegation is chosen to negotiate with Nasser after a 22-nation conference shows support for internationalizing the Suez Canal.",
        "Support for internationalizing the Suez Canal is the result of a 22-nation conference, which then picks a delegation to talk to Nasser.",
    ],
  },
  //event71
  // Add this event object to your 'events.ts' file

{
    title: "Egyptian-Israeli Armed Incidents",
    date: "17 August 1956 - 11 September 1956",
    location: "Gaza Strip / Al-Auja Zone",
    outcome: "A series of escalating ambushes, mine attacks, and cross-border raids result in numerous casualties on both sides.",
    storyElements: [
        {
            text: "Israeli units enter the Gaza Strip and ambush Egyptian patrols, killing 9 Egyptians.",
            category: "clash",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Israeli units enter the Gaza Strip and ambush Egyptian patrols, killing 9 Egyptians.",
                "An ambush of Egyptian patrols by Israeli units in the Gaza Strip results in 9 Egyptian deaths.",
                "9 Egyptians are killed when Israeli units enter the Gaza Strip and ambush their patrols.",
                "The entry of Israeli units into the Gaza Strip and their ambush of Egyptian patrols kills 9 Egyptians.",
            ],
        },
        {
            text: "An Israeli vehicle hits a mine, killing 2 soldiers and injuring 4.",
            category: "clash",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "An Israeli vehicle hits a mine, killing 2 soldiers and injuring 4.",
                "2 soldiers are killed and 4 are injured when an Israeli vehicle strikes a mine.",
                "The result of an Israeli vehicle hitting a mine is 2 dead and 4 injured soldiers.",
                "A mine explosion involving an Israeli vehicle leads to 2 soldiers killed and 4 wounded.",
            ],
        },
        {
            text: "Israeli troops respond, killing 13 Egyptian soldiers.",
            category: "retaliation",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Israeli troops respond, killing 13 Egyptian soldiers.",
                "In response, Israeli troops kill 13 Egyptian soldiers.",
                "The Israeli response results in the death of 13 Egyptian soldiers.",
                "13 Egyptian soldiers are killed in the Israeli counter-action.",
            ],
        },
        {
            text: "Fedayeen blow up an Israeli railway line near Beersheba.",
            category: "clash",
            position: { x: 150, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", 
                color: "#333", 
                width: 240, 
                height: 90, 
                edgeColor: "#66a6ff" 
            },
            options: [
                "Fedayeen blow up an Israeli railway line near Beersheba.",
                "An Israeli railway line near Beersheba is blown up by fedayeen.",
                "The blowing up of an Israeli railway line near Beersheba is carried out by fedayeen.",
                "Near Beersheba, fedayeen are responsible for blowing up an Israeli railway line.",
            ],
        },
        {
            text: "An Israeli unit enters Egypt, killing 5 Egyptian soldiers.",
            category: "retaliation",
            position: { x: 650, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 240, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "An Israeli unit enters Egypt, killing 5 Egyptian soldiers.",
                "The entry of an Israeli unit into Egypt results in the death of 5 Egyptian soldiers.",
                "5 Egyptian soldiers are killed when an Israeli unit crosses into Egypt.",
                "After an Israeli unit enters Egypt, 5 Egyptian soldiers are killed.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "followed by", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "provoking", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "followed by", color: "#ff9a9e" },
      { from: 3, to: 4, relationship: "provoking", color: "#89f7fe" },
    ],
    tags: ["Violence", "Popular action"],
    actors: ["Egypt Governmental", "Israel Governmental", "Palestine Non-Governmental"],
    locations: ["Egypt", "Gaza Strip", "Israel"],
    related_places: [],
    dateOptions: [
        "17 August 1956 - 11 September 1956",
        "30 August 1956 - 11 September 1956",
        "17 August 1956 - 31 August 1956",
        "17 August 1955 - 11 September 1955",
    ],
    locationOptions: [
        "Gaza Strip",
        "Al-Auja demilitarized zone",
        "Beersheba",
        "Khan Yunis",
    ],
    outcomeOptions: [
        "A series of escalating ambushes, mine attacks, and cross-border raids result in numerous casualties on both sides.",
        "Numerous casualties on both sides are the result of a series of escalating ambushes, mine attacks, and cross-border raids.",
        "An escalation of ambushes, mine attacks, and raids across the border leads to many casualties on both sides.",
        "Many casualties on both sides occur due to a sequence of escalating ambushes, mine attacks, and cross-border raids.",
    ],
  },

  //event72
  // Add this event object to your 'events.ts' file

{
    title: "Ben-Gurion Addresses the Issue of Suez",
    date: "26 August 1956",
    location: "Israel",
    outcome: "Ben-Gurion declares that peace in the Middle East requires complete freedom of navigation for Israel through the Red Sea and Suez Canal.",
    storyElements: [
        {
            text: "Ben-Gurion says peace will not be established unless Israel is assured of freedom of navigation.",
            category: "statement",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Ben-Gurion says peace will not be established unless Israel is assured of freedom of navigation.",
                "Unless Israel is guaranteed freedom of navigation, Ben-Gurion states that peace cannot be established.",
                "The establishment of peace, according to Ben-Gurion, depends on Israel being assured of freedom of navigation.",
                "Ben-Gurion's statement is that peace is not possible without the assurance of freedom of navigation for Israel.",
            ],
        },
        {
            text: "This applies to both the Red Sea and the Suez Canal.",
            category: "scope",
            position: { x: 400, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "This applies to both the Red Sea and the Suez Canal.",
                "Both the Red Sea and the Suez Canal are covered by this statement.",
                "The statement is applicable to the Red Sea as well as the Suez Canal.",
                "The Red Sea and the Suez Canal are both included in this declaration.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which applies to", color: "#a1c4fd" },
    ],
    tags: ["Diplomatic"],
    actors: ["Israel Governmental"],
    locations: ["Israel"],
    related_places: [],
    dateOptions: [
        "26 August 1956",
        "23 August 1956",
        "16 August 1956",
        "26 July 1956",
    ],
    locationOptions: [
        "Israel",
        "Suez Canal",
        "Red Sea",
        "Jerusalem",
    ],
    outcomeOptions: [
        "Ben-Gurion declares that peace in the Middle East requires complete freedom of navigation for Israel through the Red Sea and Suez Canal.",
        "The requirement for peace in the Middle East, according to Ben-Gurion, is full freedom of navigation for Israel in the Red Sea and Suez Canal.",
        "A declaration is made by Ben-Gurion that Israeli freedom of navigation in the Red Sea and Suez Canal is essential for peace in the Middle East.",
        "For peace to be achieved in the Middle East, Ben-Gurion states that Israel must have complete freedom of navigation in the Red Sea and Suez Canal.",
    ],
  },
  //event73

// Add this event object to your 'events.ts' file

{
    title: "Escalation Across Jordanian-Israeli Lines",
    date: "10 September 1956 - 26 September 1956",
    location: "Jordan-Israel Border",
    outcome: "A series of cross-border attacks and large-scale Israeli reprisals result in heavy casualties on both sides.",
    storyElements: [
        {
            text: "Jordanian guardsmen fire on an Israeli unit, triggering an exchange of fire.",
            category: "trigger",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Jordanian guardsmen fire on an Israeli unit, triggering an exchange of fire.",
                "An exchange of fire is triggered when Jordanian guardsmen fire on an Israeli unit.",
                "The firing by Jordanian guardsmen on an Israeli unit starts an exchange of fire.",
                "An Israeli unit is fired upon by Jordanian guardsmen, which leads to an exchange of fire.",
            ],
        },
        {
            text: "Israel retaliates by attacking police posts and schools in al-Rahwa and Gharandal.",
            category: "retaliation",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Israel retaliates by attacking police posts and schools in al-Rahwa and Gharandal.",
                "Attacks on police posts and schools in al-Rahwa and Gharandal are Israel's retaliation.",
                "In retaliation, Israel attacks police posts and schools in al-Rahwa and Gharandal.",
                "The Israeli retaliation involves attacking police posts and schools in al-Rahwa and Gharandal.",
            ],
        },
        {
            text: "A final clash at Ramat Rahel leads to a major Israeli reprisal in Husan and Wadi Fukin.",
            category: "escalation",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "A final clash at Ramat Rahel leads to a major Israeli reprisal in Husan and Wadi Fukin.",
                "A major Israeli reprisal in Husan and Wadi Fukin follows a final clash at Ramat Rahel.",
                "The final clash at Ramat Rahel prompts a large-scale Israeli reprisal in Husan and Wadi Fukin.",
                "Following the last clash at Ramat Rahel, a major Israeli reprisal takes place in Husan and Wadi Fukin.",
            ],
        },
        {
            text: "The series of fights results in the killing of dozens of Jordanians and Israelis.",
            category: "consequence",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The series of fights results in the killing of dozens of Jordanians and Israelis.",
                "Dozens of Jordanians and Israelis are killed as a result of the series of fights.",
                "The death of dozens of Jordanians and Israelis is the outcome of the fighting.",
                "As a consequence of the clashes, dozens of Jordanians and Israelis are killed.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "triggering", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "leading to", color: "#ff9a9e" },
      { from: 2, to: 3, relationship: "with total", color: "#d299c2" },
    ],
    tags: ["Violence", "Popular action"],
    actors: ["Jordan Governmental", "Israel Governmental", "Palestine Non-Governmental"],
    locations: ["Israel", "Jordan", "West Bank"],
    related_places: [],
    dateOptions: [
        "10 September 1956 - 26 September 1956",
        "26 August 1956 - 10 September 1956",
        "12 September 1956 - 23 September 1956",
        "10 September 1955 - 26 September 1955",
    ],
    locationOptions: [
        "Jordan-Israel Border",
        "Jerusalem",
        "Hebron",
        "Jenin",
    ],
    outcomeOptions: [
        "A series of cross-border attacks and large-scale Israeli reprisals result in heavy casualties on both sides.",
        "Heavy casualties on both sides are the result of a sequence of cross-border attacks and major Israeli reprisals.",
        "A cycle of cross-border attacks and large Israeli reprisals leads to significant casualties on both sides.",
        "Numerous casualties on both sides are caused by a series of cross-border attacks and major Israeli retaliations.",
    ],
  },
  //event74
// Add this event object to your 'events.ts' file

{
    title: "Situation on Jordanian-Israeli Lines Continues to Deteriorate; Israeli Raid on Qalqilya",
    date: "4 October 1956 - 11 October 1956",
    location: "Qalqilya, West Bank",
    outcome: "Palestinian attacks killing several Israelis are followed by a massive Israeli raid on Qalqilya, resulting in heavy casualties.",
    storyElements: [
        {
            text: "Palestinian militants ambush cars and kill several Israelis in two separate attacks.",
            category: "trigger",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Palestinian militants ambush cars and kill several Israelis in two separate attacks.",
                "In two separate attacks, Palestinian militants ambush cars and kill a number of Israelis.",
                "Several Israelis are killed in two different attacks where Palestinian militants ambush cars.",
                "Two separate attacks by Palestinian militants, involving ambushing cars, lead to several Israeli deaths.",
            ],
        },
        {
            text: "Two Israeli regiments supported by armor and artillery advance into the West Bank.",
            category: "retaliation",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Two Israeli regiments supported by armor and artillery advance into the West Bank.",
                "An advance into the West Bank is made by two Israeli regiments with armor and artillery support.",
                "With the backing of armor and artillery, two Israeli regiments move into the West Bank.",
                "The West Bank is entered by two Israeli regiments, which are supported by armor and artillery.",
            ],
        },
        {
            text: "The aim is to attack the Qalqilya fortified police station and other National Guard centers.",
            category: "goal",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The aim is to attack the Qalqilya fortified police station and other National Guard centers.",
                "The Qalqilya police station and other National Guard centers are the intended targets of the attack.",
                "The attack's objective is the fortified police station in Qalqilya and other National Guard centers.",
                "To attack the Qalqilya police station and other centers for the National Guard is the stated goal.",
            ],
        },
        {
            text: "Fierce battles take place over seven hours, during which 70 Jordanians and 18 Israelis are killed.",
            category: "consequence",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Fierce battles take place over seven hours, during which 70 Jordanians and 18 Israelis are killed.",
                "For seven hours, fierce battles occur, resulting in 70 Jordanian and 18 Israeli deaths.",
                "70 Jordanians and 18 Israelis are killed during seven hours of intense fighting.",
                "The death of 70 Jordanians and 18 Israelis is the result of seven hours of fierce battles.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "provoking", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "with the aim to", color: "#ff9a9e" },
      { from: 1, to: 3, relationship: "leading to", color: "#ff9a9e" },
    ],
    tags: ["Popular action", "Violence"],
    actors: ["Jordan Governmental", "Israel Governmental", "Palestine Non-Governmental"],
    locations: ["Israel", "Jordan", "West Bank"],
    related_places: [],
    dateOptions: [
        "4 October 1956 - 11 October 1956",
        "10 September 1956 - 26 September 1956",
        "10 October 1956 - 11 October 1956",
        "4 October 1955 - 11 October 1955",
    ],
    locationOptions: [
        "Qalqilya, West Bank",
        "Bir al-Sabi', Israel",
        "Tulkarm, West Bank",
        "Jerusalem",
    ],
    outcomeOptions: [
        "Palestinian attacks killing several Israelis are followed by a massive Israeli raid on Qalqilya, resulting in heavy casualties.",
        "A massive Israeli raid on Qalqilya, which caused heavy casualties, follows Palestinian attacks that killed several Israelis.",
        "Heavy casualties are the result of a large-scale Israeli raid on Qalqilya, which was a response to Palestinian attacks.",
        "Following the killing of several Israelis in Palestinian attacks, a major Israeli raid on Qalqilya leads to heavy casualties.",
    ],
  },
  //event75
  // Add this event object to your 'events.ts' file

{
    title: "Britain, France, and Israel Sign the Protocol of Sèvres",
    date: "22 October 1956 - 24 October 1956",
    location: "Sèvres, France",
    outcome: "A secret protocol is signed by Britain, France, and Israel, outlining a plan to overthrow Nasser by having Israel invade Sinai.",
    storyElements: [
        {
            text: "Britain, France, and Israel develop plans to overthrow the government of Gamal Abdel Nasser.",
            category: "plan",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Britain, France, and Israel develop plans to overthrow the government of Gamal Abdel Nasser.",
                "Plans to overthrow Nasser's government are developed by Britain, France, and Israel.",
                "The development of plans to topple the government of Nasser is a joint effort by Britain, France, and Israel.",
                "A plan to overthrow the Egyptian government of Nasser is created by Britain, France, and Israel.",
            ],
        },
        {
            text: "According to the plan, Israel is to invade the Sinai.",
            category: "detail",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "According to the plan, Israel is to invade the Sinai.",
                "The plan calls for an Israeli invasion of the Sinai.",
                "An invasion of the Sinai by Israel is the first step in the plan.",
                "The Sinai is to be invaded by Israel, as per the plan.",
            ],
        },
        {
            text: "This gives Britain and France the pretext to intervene and force both sides to withdraw from the Canal Zone.",
            category: "goal",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 120, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "This gives Britain and France the pretext to intervene and force both sides to withdraw from the Canal Zone.",
                "The pretext for Britain and France to intervene and force a withdrawal from the Canal Zone is provided by this.",
                "This action provides the excuse for Britain and France to intervene and demand a withdrawal from the Canal Zone.",
                "Britain and France get the pretext they need to intervene and force both sides away from the Canal Zone.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "where", color: "#a1c4fd" },
      { from: 1, to: 2, relationship: "which provides", color: "#d299c2" },
    ],
    tags: ["Diplomatic"],
    actors: ["France Governmental", "Israel Governmental", "Great Britain Governmental", "Egypt Governmental"],
    locations: ["France", "Great Britain", "Israel", "Egypt"],
    related_places: [],
    dateOptions: [
        "22 October 1956 - 24 October 1956",
        "10 October 1956 - 11 October 1956",
        "29 October 1956",
        "22 September 1956 - 24 September 1956",
    ],
    locationOptions: [
        "Sèvres, France",
        "London, Great Britain",
        "Tel Aviv, Israel",
        "Cairo, Egypt",
    ],
    outcomeOptions: [
        "A secret protocol is signed by Britain, France, and Israel, outlining a plan to overthrow Nasser by having Israel invade Sinai.",
        "The plan to overthrow Nasser by having Israel invade Sinai is outlined in a secret protocol signed by Britain, France, and Israel.",
        "Britain, France, and Israel sign a secret protocol with a plan for an Israeli invasion of Sinai as a pretext to overthrow Nasser.",
        "A secret protocol detailing a plan to overthrow Nasser, starting with an Israeli invasion of Sinai, is signed by Britain, France, and Israel.",
    ],
  },
  //event76
  // Add this event object to your 'events.ts' file

{
    title: "The 1956 War - The Tripartite Aggression",
    date: "29 October 1956 - 12 March 1957",
    location: "Sinai Peninsula, Egypt",
    outcome: "Israel, France, and Britain attack Egypt, but international pressure forces them to withdraw, leading to the deployment of a UN force.",
    storyElements: [
        {
            text: "Israel, France, and Britain launch a war against Egypt.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Israel, France, and Britain launch a war against Egypt.",
                "A war against Egypt is launched by Israel, France, and Britain.",
                "The launch of a war against Egypt is carried out by Israel, France, and Britain.",
                "The combined forces of Israel, France, and Britain start a war against Egypt.",
            ],
        },
        {
            text: "Israeli forces occupy the Sinai up to the Suez Canal.",
            category: "detail",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Israeli forces occupy the Sinai up to the Suez Canal.",
                "The occupation of the Sinai up to the Suez Canal is done by Israeli forces.",
                "Up to the Suez Canal, the Sinai is occupied by Israeli forces.",
                "The Sinai Peninsula is occupied by Israeli forces all the way to the Suez Canal.",
            ],
        },
        {
            text: "Soviet threat and US pressure compel the three to agree to a cease-fire.",
            category: "turning_point",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Soviet threat and US pressure compel the three to agree to a cease-fire.",
                "A cease-fire is agreed to by the three powers due to Soviet threats and US pressure.",
                "The agreement to a cease-fire by the three nations is forced by Soviet threats and US pressure.",
                "Under pressure from the US and threats from the Soviets, the three agree to a cease-fire.",
            ],
        },
        {
            text: "A UN Emergency Force starts deploying in the Sinai.",
            category: "resolution",
            position: { x: 150, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", 
                color: "#333", 
                width: 240, 
                height: 80, 
                edgeColor: "#66a6ff" 
            },
            options: [
                "A UN Emergency Force starts deploying in the Sinai.",
                "The deployment of a UN Emergency Force in the Sinai begins.",
                "In the Sinai, a UN Emergency Force begins its deployment.",
                "The Sinai sees the start of a deployment of a UN Emergency Force.",
            ],
        },
        {
            text: "Israeli forces withdraw from both the Sinai and Gaza on 12 March 1957.",
            category: "resolution",
            position: { x: 650, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", 
                color: "#333", 
                width: 240, 
                height: 90, 
                edgeColor: "#66a6ff" 
            },
            options: [
                "Israeli forces withdraw from both the Sinai and Gaza on 12 March 1957.",
                "On 12 March 1957, Israeli forces withdraw from both the Sinai and Gaza.",
                "The withdrawal of Israeli forces from the Sinai and Gaza is completed on 12 March 1957.",
                "Both the Sinai and Gaza are vacated by Israeli forces on 12 March 1957.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "where", color: "#ff9a9e" },
      { from: 1, to: 2, relationship: "but", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "leading to", color: "#d299c2" },
      { from: 3, to: 4, relationship: "and", color: "#89f7fe" },
    ],
    tags: ["Violence"],
    actors: ["Israel Governmental", "France Governmental", "Great Britain Governmental", "UN Inter-Governmental", "USA Governmental", "USSR Governmental", "Egypt Governmental"],
    locations: ["Egypt", "Israel", "France", "Great Britain"],
    related_places: [],
    dateOptions: [
        "29 October 1956 - 12 March 1957",
        "29 October 1956 - 12 November 1956",
        "12 November 1956 - 12 March 1957",
        "29 October 1955 - 12 March 1956",
    ],
    locationOptions: [
        "Sinai Peninsula, Egypt",
        "Suez Canal, Egypt",
        "Gaza Strip",
        "Kafr Qasim, Israel",
    ],
    outcomeOptions: [
        "Israel, France, and Britain attack Egypt, but international pressure forces them to withdraw, leading to the deployment of a UN force.",
        "An attack on Egypt by Israel, France, and Britain ends with their withdrawal due to international pressure and the deployment of a UN force.",
        "International pressure and the deployment of a UN force lead to the withdrawal of Israel, France, and Britain after their attack on Egypt.",
        "The attack on Egypt by Israel, France, and Britain is halted by international pressure, resulting in their withdrawal and a UN deployment.",
    ],
  },
  //event77
  // Add this event object to your 'events.ts' file

{
    title: "Israel Invades Egypt",
    date: "29 October 1956",
    location: "Sinai Peninsula, Egypt",
    outcome: "Israel invades the Sinai, dropping paratroopers and advancing along the Gulf of Aqaba, resulting in heavy casualties.",
    storyElements: [
        {
            text: "Israeli paratroopers are air-dropped east of the Suez Canal, near the Mitla Pass.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Israeli paratroopers are air-dropped east of the Suez Canal, near the Mitla Pass.",
                "Near the Mitla Pass, east of the Suez Canal, Israeli paratroopers are air-dropped.",
                "The air-dropping of Israeli paratroopers occurs east of the Suez Canal, near the Mitla Pass.",
                "East of the Suez Canal, near the Mitla Pass, is where Israeli paratroopers are dropped from the air.",
            ],
        },
        {
            text: "Israeli ground forces enter the Sinai along the Gulf of Aqaba.",
            category: "action",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Israeli ground forces enter the Sinai along the Gulf of Aqaba.",
                "Along the Gulf of Aqaba, Israeli ground forces make their way into the Sinai.",
                "The entry of Israeli ground forces into the Sinai happens along the Gulf of Aqaba.",
                "The Sinai is entered by Israeli ground forces, who advance along the Gulf of Aqaba.",
            ],
        },
        {
            text: "Casualties are heavy, with thousands of Egyptians and hundreds of Israelis killed or wounded.",
            category: "consequence",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Casualties are heavy, with thousands of Egyptians and hundreds of Israelis killed or wounded.",
                "Heavy casualties are sustained, including thousands of Egyptians and hundreds of Israelis killed or wounded.",
                "Thousands of Egyptians and hundreds of Israelis are killed or wounded, resulting in heavy casualties.",
                "The number of casualties is high, with thousands of Egyptians and hundreds of Israelis either killed or wounded.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "at the same time", color: "#a1c4fd" },
      { from: 1, to: 2, relationship: "leading to", color: "#d299c2" },
    ],
    tags: ["Violence"],
    actors: ["Israel Governmental", "Egypt Governmental"],
    locations: ["Egypt"],
    related_places: [],
    dateOptions: [
        "29 October 1956",
        "22 October 1956",
        "12 March 1957",
        "29 September 1956",
    ],
    locationOptions: [
        "Sinai Peninsula, Egypt",
        "Mitla Pass, Sinai",
        "Gulf of Aqaba",
        "Suez Canal, Egypt",
    ],
    outcomeOptions: [
        "Israel invades the Sinai, dropping paratroopers and advancing along the Gulf of Aqaba, resulting in heavy casualties.",
        "An Israeli invasion of the Sinai involves paratrooper drops and an advance along the Gulf of Aqaba, causing heavy casualties.",
        "Heavy casualties result from Israel's invasion of the Sinai, which includes dropping paratroopers and advancing along the Gulf of Aqaba.",
        "The invasion of the Sinai by Israel, featuring paratrooper drops and an advance along the Gulf of Aqaba, leads to heavy casualties.",
    ],
  },
  //event78
  // Add this event object to your 'events.ts' file

{
    title: "Kafr Qasim Massacre",
    date: "29 October 1956",
    location: "Kafr Qasim, Israel",
    outcome: "An Israeli Border Guard unit kills 49 Palestinian civilians, including women and children, for violating a curfew they were unaware of.",
    storyElements: [
        {
            text: "Israel declares a curfew in all Palestinian villages along the Armistice Line.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Israel declares a curfew in all Palestinian villages along the Armistice Line.",
                "A curfew is declared by Israel for all Palestinian villages on the Armistice Line.",
                "All Palestinian villages along the Armistice Line are placed under curfew by Israel.",
                "The declaration of a curfew in all Palestinian villages along the Armistice Line is made by Israel.",
            ],
        },
        {
            text: "Many villagers are unaware of the curfew as the order reaches them late.",
            category: "complication",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Many villagers are unaware of the curfew as the order reaches them late.",
                "As the order arrives late, many villagers do not know about the curfew.",
                "The late arrival of the order means that many villagers are unaware of the curfew.",
                "Ignorance of the curfew is widespread among villagers because the order was late.",
            ],
        },
        {
            text: "Border Guard units are commanded to shoot on sight any villagers violating the curfew.",
            category: "order",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Border Guard units are commanded to shoot on sight any villagers violating the curfew.",
                "A command is given to Border Guard units to shoot any villager violating the curfew on sight.",
                "The order for Border Guard units is to shoot on sight any villager who breaks the curfew.",
                "Any villager who violates the curfew is to be shot on sight by Border Guard units, as per their orders.",
            ],
        },
        {
            text: "In Kafr Qasim, the Border Guard unit kills 49 Palestinian civilians returning from work.",
            category: "outcome",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "In Kafr Qasim, the Border Guard unit kills 49 Palestinian civilians returning from work.",
                "49 Palestinian civilians returning from work are killed by the Border Guard unit in Kafr Qasim.",
                "The killing of 49 Palestinian civilians returning from work is carried out by the Border Guard in Kafr Qasim.",
                "The Border Guard unit in Kafr Qasim is responsible for the death of 49 Palestinian civilians coming home from work.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "but", color: "#c3cfe2" },
      { from: 0, to: 2, relationship: "with an", color: "#c3cfe2" },
      { from: 2, to: 3, relationship: "leading to", color: "#d299c2" },
    ],
    tags: ["Violence", "Sanctions"],
    actors: ["Israel Governmental", "Palestine Non-Governmental"],
    locations: ["Israel"],
    related_places: [],
    dateOptions: [
        "29 October 1956",
        "29 September 1956",
        "29 November 1956",
        "29 October 1955",
    ],
    locationOptions: [
        "Kafr Qasim, Israel",
        "The West Bank, Jordan",
        "Gaza Strip",
        "Jerusalem",
    ],
    outcomeOptions: [
        "An Israeli Border Guard unit kills 49 Palestinian civilians, including women and children, for violating a curfew they were unaware of.",
        "For violating a curfew they did not know about, 49 Palestinian civilians are killed by an Israeli Border Guard unit.",
        "The killing of 49 Palestinian civilians by an Israeli Border Guard unit occurs because they broke a curfew they were not aware of.",
        "An Israeli Border Guard unit is responsible for the death of 49 Palestinian civilians who violated a curfew they had not been informed of.",
    ],
  },
  //event79
  // Add this event object to your 'events.ts' file

{
    title: "Britain and France Join the War",
    date: "31 October 1956",
    location: "Egypt",
    outcome: "After issuing ultimatums, Britain and France begin a bombing campaign that decimates Egypt's air force.",
    storyElements: [
        {
            text: "After sending 'ultimatums' to both Egypt and Israel, Britain and France begin bombing Egypt.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "After sending 'ultimatums' to both Egypt and Israel, Britain and France begin bombing Egypt.",
                "Britain and France start bombing Egypt after sending 'ultimatums' to both sides.",
                "A bombing campaign against Egypt is started by Britain and France following their 'ultimatums'.",
                "The sending of 'ultimatums' to Egypt and Israel is followed by British and French bombing of Egypt.",
            ],
        },
        {
            text: "The bombing is carried out at first by bombers and later supplemented by warships.",
            category: "method",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The bombing is carried out at first by bombers and later supplemented by warships.",
                "At first, bombers conduct the bombing, with warships joining in later.",
                "Initially, the bombing is done by bombers, and then warships provide additional support.",
                "The method of bombing starts with bombers and is later augmented by warships.",
            ],
        },
        {
            text: "The attacks succeed in decimating Egypt's air force.",
            category: "consequence",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The attacks succeed in decimating Egypt's air force.",
                "Egypt's air force is decimated as a result of the successful attacks.",
                "Success is achieved by the attacks in decimating the Egyptian air force.",
                "The decimation of Egypt's air force is the result of the successful attacks.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "carried out by", color: "#ff9a9e" },
      { from: 0, to: 2, relationship: "and succeed in", color: "#ff9a9e" },
    ],
    tags: ["Violence"],
    actors: ["France Governmental", "Great Britain Governmental", "Egypt Governmental", "Israel Governmental"],
    locations: ["Egypt"],
    related_places: [],
    dateOptions: [
        "31 October 1956",
        "29 October 1956",
        "5 November 1956",
        "31 September 1956",
    ],
    locationOptions: [
        "Egypt",
        "Suez Canal, Egypt",
        "Mediterranean Sea",
        "Cairo, Egypt",
    ],
    outcomeOptions: [
        "After issuing ultimatums, Britain and France begin a bombing campaign that decimates Egypt's air force.",
        "A bombing campaign that decimates Egypt's air force is started by Britain and France after they issue ultimatums.",
        "The decimation of Egypt's air force is the result of a bombing campaign by Britain and France that followed their ultimatums.",
        "Britain and France issue ultimatums and then launch a bombing campaign, which succeeds in decimating the Egyptian air force.",
    ],
  },
  //event80
  // Add this event object to your 'events.ts' file

{
    title: "Israel Occupies Gaza",
    date: "1 November 1956 - 7 March 1957",
    location: "Gaza Strip",
    outcome: "Israel occupies the Gaza Strip, committing several massacres and killing hundreds of Palestinians during its four-month occupation.",
    storyElements: [
        {
            text: "Israeli forces, supported by French gunships, attack and take Rafah and Gaza City.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Israeli forces, supported by French gunships, attack and take Rafah and Gaza City.",
                "Rafah and Gaza City are attacked and taken by Israeli forces with French gunship support.",
                "With the help of French gunships, Israeli forces attack and capture Rafah and Gaza City.",
                "The attack and capture of Rafah and Gaza City is carried out by Israeli forces, supported by French gunships.",
            ],
        },
        {
            text: "After a fierce battle, Israeli forces take Khan Yunis.",
            category: "action",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "After a fierce battle, Israeli forces take Khan Yunis.",
                "Khan Yunis is taken by Israeli forces following a fierce battle.",
                "A fierce battle precedes the capture of Khan Yunis by Israeli forces.",
                "The taking of Khan Yunis by Israeli forces happens after a fierce battle.",
            ],
        },
        {
            text: "After the fall of Khan Yunis, Israeli troops kill 275 Palestinians.",
            category: "massacre",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "After the fall of Khan Yunis, Israeli troops kill 275 Palestinians.",
                "The killing of 275 Palestinians by Israeli troops follows the fall of Khan Yunis.",
                "275 Palestinians are killed by Israeli troops subsequent to the fall of Khan Yunis.",
                "Following the capture of Khan Yunis, 275 Palestinians are killed by Israeli troops.",
            ],
        },
        {
            text: "On 12 November, 111 Palestinians are killed in Rafah.",
            category: "massacre",
            position: { x: 150, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 240, 
                height: 80, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "On 12 November, 111 Palestinians are killed in Rafah.",
                "In Rafah, 111 Palestinians are killed on 12 November.",
                "The death of 111 Palestinians in Rafah occurs on 12 November.",
                "November 12 sees the killing of 111 Palestinians in Rafah.",
            ],
        },
        {
            text: "Between 930 and 1,200 Palestinians are killed during the Israeli occupation.",
            category: "consequence",
            position: { x: 650, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Between 930 and 1,200 Palestinians are killed during the Israeli occupation.",
                "The Israeli occupation results in the death of 930 to 1,200 Palestinians.",
                "During the Israeli occupation, the number of Palestinians killed is between 930 and 1,200.",
                "The death toll for Palestinians during the Israeli occupation is between 930 and 1,200.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "followed by", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "after which", color: "#a1c4fd" },
      { from: 0, to: 3, relationship: "in", color: "#c3cfe2" },
      { from: 0, to: 4, relationship: "leading to total of", color: "#c3cfe2" },
    ],
    tags: ["Violence"],
    actors: ["Israel Governmental", "France Governmental", "Palestine Quasi-Governmental", "Egypt Governmental"],
    locations: ["Gaza Strip", "Egypt", "France", "Israel"],
    related_places: [],
    dateOptions: [
        "1 November 1956 - 7 March 1957",
        "29 October 1956 - 12 November 1956",
        "3 November 1956",
        "1 November 1955 - 7 March 1956",
    ],
    locationOptions: [
        "Gaza Strip",
        "Rafah",
        "Khan Yunis",
        "Gaza City",
    ],
    outcomeOptions: [
        "Israel occupies the Gaza Strip, committing several massacres and killing hundreds of Palestinians during its four-month occupation.",
        "The four-month Israeli occupation of the Gaza Strip involves several massacres and the killing of hundreds of Palestinians.",
        "Several massacres and the deaths of hundreds of Palestinians occur during the four-month Israeli occupation of the Gaza Strip.",
        "Hundreds of Palestinians are killed in several massacres during the Israeli occupation of the Gaza Strip, which lasted four months.",
    ],
  },
  //event81
  // Add this event object to your 'events.ts' file

{
    title: "UNGA 997 (ES-I): Calling for an Immediate Cease-Fire (the Suez Crisis)",
    date: "2 November 1956",
    location: "New York, USA",
    outcome: "After a Security Council deadlock, the General Assembly convenes an emergency session and calls for an immediate ceasefire and withdrawal.",
    storyElements: [
        {
            text: "The UN Security Council is unable to resolve the 'Suez crisis' due to British and French vetoes.",
            category: "deadlock",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The UN Security Council is unable to resolve the 'Suez crisis' due to British and French vetoes.",
                "Due to British and French vetoes, the UN Security Council cannot resolve the 'Suez crisis'.",
                "The 'Suez crisis' remains unresolved in the UN Security Council because of British and French vetoes.",
                "British and French vetoes prevent the UN Security Council from resolving the 'Suez crisis'.",
            ],
        },
        {
            text: "The General Assembly invokes the 'Uniting for Peace' resolution and convenes an emergency session.",
            category: "action",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The General Assembly invokes the 'Uniting for Peace' resolution and convenes an emergency session.",
                "An emergency session is convened by the General Assembly, which invokes the 'Uniting for Peace' resolution.",
                "The 'Uniting for Peace' resolution is invoked by the General Assembly to call an emergency session.",
                "To convene an emergency session, the General Assembly uses the 'Uniting for Peace' resolution.",
            ],
        },
        {
            text: "It adopts Resolution 997, calling for an immediate cease-fire and withdrawal of all forces.",
            category: "resolution",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It adopts Resolution 997, calling for an immediate cease-fire and withdrawal of all forces.",
                "Resolution 997 is adopted, which calls for an immediate cease-fire and the withdrawal of forces.",
                "A call for an immediate cease-fire and withdrawal is made in the adopted Resolution 997.",
                "The adoption of Resolution 997 includes a call for an immediate cease-fire and force withdrawal.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "leading to", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "which", color: "#a1c4fd" },
    ],
    tags: ["Diplomatic"],
    actors: ["UN Inter-Governmental", "France Governmental", "Great Britain Governmental"],
    locations: [],
    related_places: [],
    dateOptions: [
        "2 November 1956",
        "3 November 1950",
        "31 October 1956",
        "2 November 1955",
    ],
    locationOptions: [
        "New York, USA",
        "Suez Canal, Egypt",
        "London, Great Britain",
        "Paris, France",
    ],
    outcomeOptions: [
        "After a Security Council deadlock, the General Assembly convenes an emergency session and calls for an immediate ceasefire and withdrawal.",
        "An emergency session is called by the General Assembly after a Security Council deadlock, leading to a call for a ceasefire and withdrawal.",
        "A call for a ceasefire and withdrawal is made by the General Assembly in an emergency session convened due to a Security Council deadlock.",
        "Due to a Security Council deadlock, an emergency session of the General Assembly is held, which calls for an immediate ceasefire and withdrawal.",
    ],
  },
  //event82
  // Add this event object to your 'events.ts' file

{
    title: "UNGA 998 (ES-I): Creating the UN Emergency Force (UNEF)",
    date: "5 November 1956",
    location: "New York, USA",
    outcome: "The UN General Assembly creates the UN Emergency Force (UNEF) to secure and supervise the ceasefire.",
    storyElements: [
        {
            text: "The GA emergency session creates the UN Emergency Force (UNEF).",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The GA emergency session creates the UN Emergency Force (UNEF).",
                "The UN Emergency Force (UNEF) is created by the GA emergency session.",
                "Creation of the UN Emergency Force (UNEF) is done by the GA emergency session.",
                "During its emergency session, the GA establishes the UN Emergency Force (UNEF).",
            ],
        },
        {
            text: "The force is created to secure and supervise the cessation of hostilities.",
            category: "purpose",
            position: { x: 400, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The force is created to secure and supervise the cessation of hostilities.",
                "To secure and supervise the end of hostilities is the force's purpose.",
                "The purpose of the force is to secure and oversee the cessation of hostilities.",
                "The securing and supervising of the end of hostilities is the reason for the force's creation.",
            ],
        },
        {
            text: "This is in accordance with Resolution 997.",
            category: "context",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#f5f7fa" 
            },
            options: [
                "This is in accordance with Resolution 997.",
                "In line with Resolution 997 is how this action is taken.",
                "The action is consistent with the terms of Resolution 997.",
                "This follows the mandate of Resolution 997.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "to", color: "#a1c4fd" },
      { from: 1, to: 2, relationship: "in accordance with", color: "#d299c2" },
    ],
    tags: ["Diplomatic", "Institutional"],
    actors: ["UN Inter-Governmental"],
    locations: [],
    related_places: [],
    dateOptions: [
        "5 November 1956",
        "2 November 1956",
        "3 November 1950",
        "5 October 1956",
    ],
    locationOptions: [
        "New York, USA",
        "Suez Canal, Egypt",
        "Sinai Peninsula, Egypt",
        "Gaza Strip",
    ],
    outcomeOptions: [
        "The UN General Assembly creates the UN Emergency Force (UNEF) to secure and supervise the ceasefire.",
        "To secure and supervise the ceasefire, the UN General Assembly establishes the UN Emergency Force (UNEF).",
        "The creation of the UN Emergency Force (UNEF) by the UN General Assembly is for the purpose of securing and supervising the ceasefire.",
        "The UN Emergency Force (UNEF) is created by the UN General Assembly with the goal of securing and supervising the ceasefire.",
    ],
  },
  //event83
  // Add this event object to your 'events.ts' file

{
    title: "British and French Troops Invade Canal Zone",
    date: "5 November 1956",
    location: "Suez Canal Zone, Egypt",
    outcome: "British and French paratroopers land in the Canal Zone, defeating Egyptian forces and inflicting heavy casualties.",
    storyElements: [
        {
            text: "British and French paratroopers land at al-Gamil airfield and al-Raswa.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "British and French paratroopers land at al-Gamil airfield and al-Raswa.",
                "The landing of British and French paratroopers occurs at al-Gamil airfield and al-Raswa.",
                "At al-Gamil airfield and al-Raswa, British and French paratroopers are landed.",
                "Paratroopers from Britain and France land at two key locations, al-Gamil airfield and al-Raswa.",
            ],
        },
        {
            text: "The troops defeat the Egyptian forces in Port Fuad and proceed to Port Said.",
            category: "advance",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The troops defeat the Egyptian forces in Port Fuad and proceed to Port Said.",
                "After defeating Egyptian forces in Port Fuad, the troops move on to Port Said.",
                "Egyptian forces in Port Fuad are defeated, and the troops then advance to Port Said.",
                "The defeat of Egyptian forces in Port Fuad is followed by an advance on Port Said.",
            ],
        },
        {
            text: "Egyptian casualties are estimated at 650 dead and 900 wounded.",
            category: "consequence",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Egyptian casualties are estimated at 650 dead and 900 wounded.",
                "An estimated 650 Egyptians are dead and 900 are wounded.",
                "The estimated number of Egyptian casualties is 650 killed and 900 injured.",
                "Estimates place Egyptian casualties at 650 dead and 900 wounded.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "who then", color: "#a1c4fd" },
      { from: 1, to: 2, relationship: "inflicting", color: "#d299c2" },
    ],
    tags: ["Violence"],
    actors: ["Great Britain Governmental", "France Governmental", "Egypt Governmental"],
    locations: ["Egypt", "Sinai"],
    related_places: [],
    dateOptions: [
        "5 November 1956",
        "31 October 1956",
        "2 November 1956",
        "5 October 1956",
    ],
    locationOptions: [
        "Suez Canal Zone, Egypt",
        "Port Said, Egypt",
        "Port Fuad, Egypt",
        "Al-Gamil airfield, Egypt",
    ],
    outcomeOptions: [
        "British and French paratroopers land in the Canal Zone, defeating Egyptian forces and inflicting heavy casualties.",
        "The landing of British and French paratroopers in the Canal Zone leads to the defeat of Egyptian forces and heavy casualties.",
        "Heavy casualties and the defeat of Egyptian forces result from the landing of British and French paratroopers in the Canal Zone.",
        "After British and French paratroopers land in the Canal Zone, they defeat Egyptian forces, causing heavy casualties.",
    ],
  },
  //event84
  // Add this event object to your 'events.ts' file

{
    title: "Soviet Union Threatens Intervention",
    date: "5 November 1956",
    location: "Moscow, USSR",
    outcome: "The Soviet Union threatens rocket attacks on Britain, France, and Israel, prompting the US to pressure them to end their aggression.",
    storyElements: [
        {
            text: "Soviet premier Nikolai Bulganin threatens to intervene in support of Egypt.",
            category: "threat",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Soviet premier Nikolai Bulganin threatens to intervene in support of Egypt.",
                "A threat to intervene in support of Egypt is made by Soviet premier Nikolai Bulganin.",
                "Nikolai Bulganin, the Soviet premier, makes a threat to intervene on Egypt's behalf.",
                "An intervention in support of Egypt is threatened by Soviet premier Nikolai Bulganin.",
            ],
        },
        {
            text: "Bulganin threatens to launch rockets at Britain, France, and Israel.",
            category: "threat",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Bulganin threatens to launch rockets at Britain, France, and Israel.",
                "A threat to launch rockets at Britain, France, and Israel is made by Bulganin.",
                "The launching of rockets at Britain, France, and Israel is threatened by Bulganin.",
                "Britain, France, and Israel are threatened with rocket launches by Bulganin.",
            ],
        },
        {
            text: "The threat convinces US President Eisenhower to pressure the three to end their aggression.",
            category: "consequence",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The threat convinces US President Eisenhower to pressure the three to end their aggression.",
                "US President Eisenhower is convinced by the threat to pressure the three to stop their aggression.",
                "The pressure on the three nations to end their aggression from US President Eisenhower is due to the threat.",
                "Because of the threat, US President Eisenhower is persuaded to pressure the three to halt their aggression.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "specifically by threatening", color: "#ff9a9e" },
      { from: 1, to: 2, relationship: "which convinces", color: "#ff9a9e" },
    ],
    tags: ["Diplomatic", "Sanctions"],
    actors: ["USSR Governmental", "France Governmental", "Great Britain Governmental", "Israel Governmental", "USA Governmental", "Egypt Governmental"],
    locations: ["Egypt", "Great Britain", "France", "Israel"],
    related_places: [],
    dateOptions: [
        "5 November 1956",
        "2 November 1956",
        "31 October 1956",
        "5 October 1956",
    ],
    locationOptions: [
        "Moscow, USSR",
        "Washington D.C., USA",
        "London, Great Britain",
        "Paris, France",
    ],
    outcomeOptions: [
        "The Soviet Union threatens rocket attacks on Britain, France, and Israel, prompting the US to pressure them to end their aggression.",
        "A Soviet threat of rocket attacks on Britain, France, and Israel leads the US to pressure them to stop their aggression.",
        "The US is prompted to pressure Britain, France, and Israel to end their aggression after the Soviet Union threatens rocket attacks.",
        "After the Soviet Union threatens rocket attacks on Britain, France, and Israel, the US applies pressure on them to halt their aggression.",
    ],
  },
  //event85
  // Add this event object to your 'events.ts' file

{
    title: "UNGA 1002 (ES-I): Calling for Withdrawal of Israeli Forces Behind Armistice Lines and of British and French Forces from Egypt",
    date: "7 November 1956",
    location: "New York, USA",
    outcome: "The UN General Assembly again calls for the withdrawal of all forces, and all four parties accept a UN-arranged ceasefire.",
    storyElements: [
        {
            text: "The GA emergency session once again calls upon Israel to withdraw all its forces.",
            category: "call_to_action",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The GA emergency session once again calls upon Israel to withdraw all its forces.",
                "A renewed call for Israel to withdraw all its forces is made by the GA emergency session.",
                "Israel is once again called upon by the GA emergency session to pull back all its forces.",
                "The withdrawal of all Israeli forces is once again demanded by the GA emergency session.",
            ],
        },
        {
            text: "It also calls upon Great Britain and France to withdraw all their forces from Egyptian territory.",
            category: "call_to_action",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It also calls upon Great Britain and France to withdraw all their forces from Egyptian territory.",
                "A call is also made for Great Britain and France to withdraw their forces from Egyptian territory.",
                "The withdrawal of all British and French forces from Egyptian territory is also demanded.",
                "Great Britain and France are also called upon to pull all their forces out of Egyptian territory.",
            ],
        },
        {
            text: "Israel, Britain, France and Egypt accept a cease-fire arranged by the UN secretary-general.",
            category: "agreement",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#f5f7fa" 
            },
            options: [
                "Israel, Britain, France and Egypt accept a cease-fire arranged by the UN secretary-general.",
                "A UN-arranged cease-fire is accepted by Israel, Britain, France and Egypt.",
                "The acceptance of a UN-brokered cease-fire comes from Israel, Britain, France and Egypt.",
                "All four parties - Israel, Britain, France and Egypt - agree to a UN-arranged cease-fire.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "and also calls on", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "leading to", color: "#a1c4fd" },
    ],
    tags: ["Diplomatic", "Violence"],
    actors: ["UN Inter-Governmental", "Israel Governmental", "Great Britain Governmental", "France Governmental", "Egypt Governmental"],
    locations: [],
    related_places: [],
    dateOptions: [
        "7 November 1956",
        "5 November 1956",
        "2 November 1956",
        "7 October 1956",
    ],
    locationOptions: [
        "New York, USA",
        "Suez Canal, Egypt",
        "Sinai Peninsula, Egypt",
        "Gaza Strip",
    ],
    outcomeOptions: [
        "The UN General Assembly again calls for the withdrawal of all forces, and all four parties accept a UN-arranged ceasefire.",
        "A renewed call for withdrawal from the UNGA is followed by the acceptance of a UN-arranged ceasefire by all four parties.",
        "All four parties agree to a UN-arranged ceasefire after the UNGA once again calls for the withdrawal of all forces.",
        "The UNGA's second call for a withdrawal of all forces leads to all four parties accepting a UN-brokered ceasefire.",
    ],
  },
  //event86
  // Add this event object to your 'events.ts' file

{
    title: "Israel Addresses the Future of Sinai",
    date: "7 November 1956 - 8 November 1956",
    location: "Israel",
    outcome: "Ben-Gurion initially takes a hardline stance on holding Sinai but is quickly forced by US pressure to agree to a conditional withdrawal.",
    storyElements: [
        {
            text: "Ben-Gurion states Israel will not consent to a foreign force in any area held by Israel.",
            category: "statement",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Ben-Gurion states Israel will not consent to a foreign force in any area held by Israel.",
                "Israel's non-consent to a foreign force in its held territory is stated by Ben-Gurion.",
                "A statement from Ben-Gurion indicates Israel will not agree to a foreign force in areas it holds.",
                "The position of Israel, as stated by Ben-Gurion, is no consent for foreign forces in its held areas.",
            ],
        },
        {
            text: "He declares that 'the armistice with Egypt is dead, as are the armistice lines.'",
            category: "declaration",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "He declares that 'the armistice with Egypt is dead, as are the armistice lines.'",
                "A declaration is made that 'the armistice with Egypt is dead, as are the armistice lines.'",
                "The death of the armistice with Egypt and its lines is declared by him.",
                "He makes a declaration that both the armistice with Egypt and the armistice lines are dead.",
            ],
        },
        {
            text: "Pressured by the US, Ben-Gurion is compelled to make a U-turn the following day.",
            category: "reversal",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Pressured by the US, Ben-Gurion is compelled to make a U-turn the following day.",
                "A U-turn is made by Ben-Gurion the next day due to pressure from the US.",
                "Ben-Gurion is forced to make a U-turn on the following day because of US pressure.",
                "The pressure from the US compels Ben-Gurion to reverse his position the next day.",
            ],
        },
        {
            text: "He declares Israel will withdraw its troops 'upon conclusion of satisfactory arrangements' with the UNEF.",
            category: "condition",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "He declares Israel will withdraw its troops 'upon conclusion of satisfactory arrangements' with the UNEF.",
                "A declaration is made that Israeli troops will withdraw after 'satisfactory arrangements' with the UNEF.",
                "The withdrawal of Israeli troops is conditional on 'satisfactory arrangements' with the UNEF, he declares.",
                "He states that Israel's troop withdrawal will happen once 'satisfactory arrangements' with the UNEF are made.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "and declares", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "but", color: "#ff9a9e" },
      { from: 2, to: 3, relationship: "and states", color: "#d299c2" },
    ],
    tags: ["Diplomatic", "Policy-Program"],
    actors: ["Israel Governmental", "USA Governmental", "UN Inter-Governmental", "Egypt Governmental"],
    locations: ["Israel", "Sinai", "Egypt"],
    related_places: [],
    dateOptions: [
        "7 November 1956 - 8 November 1956",
        "7 November 1956",
        "8 November 1956",
        "7 October 1956 - 8 October 1956",
    ],
    locationOptions: [
        "Israel",
        "Sinai desert",
        "Suez Canal, Egypt",
        "Washington D.C., USA",
    ],
    outcomeOptions: [
        "Ben-Gurion initially takes a hardline stance on holding Sinai but is quickly forced by US pressure to agree to a conditional withdrawal.",
        "A hardline stance on Sinai by Ben-Gurion is quickly reversed due to US pressure, leading to an agreement for a conditional withdrawal.",
        "US pressure forces Ben-Gurion to abandon his hardline stance on Sinai and agree to a conditional withdrawal.",
        "Initially taking a hardline stance on Sinai, Ben-Gurion is compelled by US pressure to make a U-turn and agree to a conditional withdrawal.",
    ],
  },
  //event87
  // Add this event object to your 'events.ts' file

{
    title: "Israel Addresses the Future of Gaza",
    date: "10 November 1956 - 3 February 1957",
    location: "Israel",
    outcome: "Israeli leaders make conflicting statements about Gaza's future, ranging from annexation to a joint administration with the UN.",
    storyElements: [
        {
            text: "Foreign Minister Golda Meir declares that the Gaza Strip is 'an integral part of Israel.'",
            category: "statement",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Foreign Minister Golda Meir declares that the Gaza Strip is 'an integral part of Israel.'",
                "A declaration is made by Foreign Minister Golda Meir that the Gaza Strip is 'an integral part of Israel.'",
                "The Gaza Strip is declared to be 'an integral part of Israel' by Foreign Minister Golda Meir.",
                "Golda Meir, the Foreign Minister, states that the Gaza Strip is 'an integral part of Israel.'",
            ],
        },
        {
            text: "Prime Minister Ben-Gurion declares that Israel will not permit Egypt to return to the Gaza Strip.",
            category: "statement",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Prime Minister Ben-Gurion declares that Israel will not permit Egypt to return to the Gaza Strip.",
                "A declaration from Prime Minister Ben-Gurion states that Israel will not allow Egypt back into Gaza.",
                "Israel's refusal to permit Egypt's return to the Gaza Strip is declared by Prime Minister Ben-Gurion.",
                "The non-permission for Egypt to return to the Gaza Strip is a declaration made by Prime Minister Ben-Gurion.",
            ],
        },
        {
            text: "Meir later suggests a joint Gaza administration by Israel and UNEF.",
            category: "proposal",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Meir later suggests a joint Gaza administration by Israel and UNEF.",
                "A suggestion for a joint Gaza administration by Israel and UNEF is later made by Meir.",
                "Later, Meir proposes a joint administration for Gaza involving both Israel and UNEF.",
                "A joint administration of Gaza by Israel and UNEF is a later proposal from Meir.",
            ],
        },
        {
            text: "This could involve the 'withdrawal of Israel military forces.'",
            category: "condition",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 80, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "This could involve the 'withdrawal of Israel military forces.'",
                "The 'withdrawal of Israel military forces' could be a part of this.",
                "An involvement of the 'withdrawal of Israel military forces' is possible.",
                "This plan might include the 'withdrawal of Israel military forces.'",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "followed by", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "while", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "which could involve", color: "#d299c2" },
    ],
    tags: ["Diplomatic", "Policy-Program"],
    actors: ["Israel Governmental", "UN Inter-Governmental", "Egypt Governmental"],
    locations: ["Israel", "Gaza Strip"],
    related_places: [],
    dateOptions: [
        "10 November 1956 - 3 February 1957",
        "25 December 1956",
        "17 January 1957",
        "10 November 1955 - 3 February 1956",
    ],
    locationOptions: [
        "Israel",
        "Gaza Strip",
        "New York, USA",
        "Egypt",
    ],
    outcomeOptions: [
        "Israeli leaders make conflicting statements about Gaza's future, ranging from annexation to a joint administration with the UN.",
        "Conflicting statements are made by Israeli leaders regarding Gaza's future, from annexation to a joint UN administration.",
        "From annexation to a joint administration with the UN, Israeli leaders offer conflicting views on the future of Gaza.",
        "The future of Gaza is the subject of conflicting statements by Israeli leaders, with ideas ranging from annexation to joint UN administration.",
    ],
  },
  //event88
  // Add this event object to your 'events.ts' file

{
    title: "The United Nations Emergency Force (UNEF) Deploys in Sinai",
    date: "12 November 1956 - 12 March 1957",
    location: "Sinai Peninsula, Egypt",
    outcome: "A 6,000-strong UNEF, contributed by eleven countries, deploys to oversee the withdrawal of British, French, and Israeli forces.",
    storyElements: [
        {
            text: "The UNEF is tasked with facilitating the orderly transition in the Suez Canal Zone.",
            category: "mission",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The UNEF is tasked with facilitating the orderly transition in the Suez Canal Zone.",
                "Facilitating an orderly transition in the Suez Canal Zone is the task of the UNEF.",
                "The task of the UNEF is to help with an orderly transition in the Suez Canal Zone.",
                "The mission given to the UNEF is to facilitate an orderly transition in the Suez Canal Zone.",
            ],
        },
        {
            text: "It is also tasked with separating Israeli and Egyptian forces and overseeing the Israeli evacuation.",
            category: "mission",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "It is also tasked with separating Israeli and Egyptian forces and overseeing the Israeli evacuation.",
                "The separation of Israeli and Egyptian forces and the supervision of the Israeli evacuation are also its tasks.",
                "Another task is to separate Israeli and Egyptian forces and to oversee the Israeli evacuation.",
                "It also has the mission of separating Israeli and Egyptian forces and supervising the Israeli withdrawal.",
            ],
        },
        {
            text: "Eleven countries contribute to the force, which reaches a full strength of 6,000.",
            category: "composition",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Eleven countries contribute to the force, which reaches a full strength of 6,000.",
                "The force, with contributions from eleven countries, reaches a total of 6,000 troops.",
                "A full strength of 6,000 is reached by the force, with eleven countries contributing.",
                "With 6,000 troops at full strength, the force is made up of contributions from eleven nations.",
            ],
        },
    ],
    storyConnections: [
      { from: 2, to: 0, relationship: "whose mission is", color: "#d299c2" },
      { from: 0, to: 1, relationship: "and to", color: "#c3cfe2" },
    ],
    tags: ["Diplomatic"],
    actors: ["Great Britain Governmental", "France Governmental", "Israel Governmental", "Egypt Governmental", "UN Inter-Governmental"],
    locations: ["Egypt", "Sinai"],
    related_places: [],
    dateOptions: [
        "12 November 1956 - 12 March 1957",
        "5 November 1956",
        "22 December 1956",
        "12 November 1955 - 12 March 1956",
    ],
    locationOptions: [
        "Sinai Peninsula, Egypt",
        "Suez Canal Zone, Egypt",
        "Gaza Strip",
        "New York, USA",
    ],
    outcomeOptions: [
        "A 6,000-strong UNEF, contributed by eleven countries, deploys to oversee the withdrawal of British, French, and Israeli forces.",
        "To oversee the withdrawal of foreign forces, a 6,000-strong UNEF from eleven countries is deployed.",
        "The deployment of a 6,000-strong, eleven-country UNEF is for the purpose of supervising the withdrawal of foreign troops.",
        "A UN force of 6,000 from eleven nations is deployed to manage the withdrawal of British, French, and Israeli forces.",
    ],
  },
  //event89
  // Add this event object to your 'events.ts' file

{
    title: "UNRWA Director Issues Special Report on Situation in Gaza Strip",
    date: "15 December 1956",
    location: "Gaza Strip",
    outcome: "The UNRWA Director sends a special report to the UN General Assembly detailing the effects of the Israeli occupation on Gaza refugees.",
    storyElements: [
        {
            text: "The UNRWA Director sends the UN General Assembly a special report on the situation in Gaza.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The UNRWA Director sends the UN General Assembly a special report on the situation in Gaza.",
                "A special report on the situation in Gaza is sent to the UN General Assembly by the UNRWA Director.",
                "The sending of a special report to the UN General Assembly on the Gaza situation is done by the UNRWA Director.",
                "To the UN General Assembly, a special report on the Gaza situation is submitted by the UNRWA Director.",
            ],
        },
        {
            text: "The report is a result of Israel's occupation of Gaza.",
            category: "context",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The report is a result of Israel's occupation of Gaza.",
                "Israel's occupation of Gaza is the reason for the report.",
                "The report is prompted by the Israeli occupation of the Gaza Strip.",
                "As a result of the Israeli occupation of Gaza, the report is issued.",
            ],
        },
        {
            text: "It presents the effects of military operations on refugees, casualties, and supply problems.",
            category: "content",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "It presents the effects of military operations on refugees, casualties, and supply problems.",
                "The effects of military operations on refugees, casualties, and supplies are presented in the report.",
                "The report details the impact of military operations on refugees, including casualties and supply issues.",
                "An overview of the effects of military operations on refugees, casualties, and supply problems is provided.",
            ],
        },
    ],
    storyConnections: [
      { from: 1, to: 0, relationship: "prompting", color: "#d299c2" },
      { from: 0, to: 2, relationship: "which presents", color: "#a1c4fd" },
    ],
    tags: ["Institutional"],
    actors: ["UN Inter-Governmental", "Israel Governmental"],
    locations: [],
    related_places: [],
    dateOptions: [
        "15 December 1956",
        "1 November 1956",
        "12 November 1956",
        "15 November 1956",
    ],
    locationOptions: [
        "Gaza Strip",
        "New York, USA",
        "Sinai Peninsula, Egypt",
        "Jerusalem",
    ],
    outcomeOptions: [
        "The UNRWA Director sends a special report to the UN General Assembly detailing the effects of the Israeli occupation on Gaza refugees.",
        "A special report from the UNRWA Director to the UN General Assembly outlines the impact of the Israeli occupation on Gaza refugees.",
        "The effects of the Israeli occupation on refugees in Gaza are detailed in a special report from the UNRWA Director to the UN General Assembly.",
        "Detailing the impact of the Israeli occupation on Gaza refugees, a special report is sent by the UNRWA Director to the UN General Assembly.",
    ],
  },
  //event90
  // Add this event object to your 'events.ts' file

{
    title: "Palestinians in Israel Stage a General Strike to Protest the Kafr Qasim Massacre",
    date: "6 January 1957",
    location: "Israel",
    outcome: "Palestinians in Israel hold a widespread general strike to protest the Kafr Qasim massacre, marking a reemergence of collective identity.",
    storyElements: [
        {
            text: "Palestinians in Israel stage a general strike in numerous cities and villages.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Palestinians in Israel stage a general strike in numerous cities and villages.",
                "A general strike is staged by Palestinians in Israel across many cities and villages.",
                "In many cities and villages, Palestinians in Israel organize a general strike.",
                "The staging of a general strike in numerous cities and villages is carried out by Palestinians in Israel.",
            ],
        },
        {
            text: "The strike is scheduled to coincide with the opening of the military trial of the perpetrators.",
            category: "timing",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The strike is scheduled to coincide with the opening of the military trial of the perpetrators.",
                "The timing of the strike is set to match the start of the military trial for the perpetrators.",
                "Coinciding with the opening of the perpetrators' military trial is how the strike is scheduled.",
                "The strike's schedule is planned to align with the beginning of the military trial of the perpetrators.",
            ],
        },
        {
            text: "Israeli police tighten travel restrictions and attempt to intimidate participants.",
            category: "reaction",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Israeli police tighten travel restrictions and attempt to intimidate participants.",
                "Travel restrictions are tightened and intimidation of participants is attempted by Israeli police.",
                "An attempt to intimidate participants and a tightening of travel restrictions is made by Israeli police.",
                "The Israeli police response includes tightening travel restrictions and attempting to intimidate participants.",
            ],
        },
        {
            text: "The event marks an important stage in the reemergence of the collective identity of Palestinians in Israel.",
            category: "significance",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The event marks an important stage in the reemergence of the collective identity of Palestinians in Israel.",
                "An important stage in the reemergence of Palestinian collective identity in Israel is marked by this event.",
                "This event is a significant milestone in the revival of the collective identity of Palestinians in Israel.",
                "The reemergence of a collective identity for Palestinians in Israel is significantly advanced by this event.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "timed to coincide with", color: "#c3cfe2" },
      { from: 0, to: 2, relationship: "prompting", color: "#c3cfe2" },
      { from: 0, to: 3, relationship: "marking", color: "#c3cfe2" },
    ],
    tags: ["Popular action", "Sanctions"],
    actors: ["Palestine Non-Governmental", "Israel Governmental"],
    locations: ["Israel"],
    related_places: [],
    dateOptions: [
        "6 January 1957",
        "29 October 1956",
        "14 July 1952",
        "6 December 1956",
    ],
    locationOptions: [
        "Israel",
        "Nazareth",
        "Acre",
        "Haifa",
    ],
    outcomeOptions: [
        "Palestinians in Israel hold a widespread general strike to protest the Kafr Qasim massacre, marking a reemergence of collective identity.",
        "A widespread general strike is held by Palestinians in Israel to protest the Kafr Qasim massacre, which signals a reemergence of collective identity.",
        "The protest against the Kafr Qasim massacre by Palestinians in Israel takes the form of a general strike, marking a key stage in their collective identity's reemergence.",
        "Marking a reemergence of collective identity, a general strike is staged by Palestinians in Israel as a protest against the Kafr Qasim massacre.",
    ],
  },
  //event91
  // Add this event object to your 'events.ts' file

{
    title: "GA Resolutions 1123, 1124, 1125 (XI)",
    date: "19 January 1957 - 3 February 1957",
    location: "New York, USA",
    outcome: "The UN deplores Israel's failure to withdraw but also seeks to reassure Israel by proposing the placement of UNEF on the demarcation line after withdrawal.",
    storyElements: [
        {
            text: "Resolution 1123 notes with 'regret and concern' Israel's failure to complete its withdrawal.",
            category: "finding",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Resolution 1123 notes with 'regret and concern' Israel's failure to complete its withdrawal.",
                "Israel's failure to complete its withdrawal is noted with 'regret and concern' in Resolution 1123.",
                "With 'regret and concern', Resolution 1123 notes that Israel has not completed its withdrawal.",
                "The failure of Israel to finish its withdrawal is noted with 'regret and concern' by Resolution 1123.",
            ],
        },
        {
            text: "Resolution 1124 again 'deplores' Israel's non-compliance.",
            category: "finding",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Resolution 1124 again 'deplores' Israel's non-compliance.",
                "Israel's non-compliance is once again 'deplored' in Resolution 1124.",
                "Again, Resolution 1124 'deplores' the fact that Israel is not complying.",
                "The non-compliance of Israel is 'deplored' again in Resolution 1124.",
            ],
        },
        {
            text: "Resolution 1125 seeks to reassure Israel after its withdrawal.",
            category: "reassurance",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Resolution 1125 seeks to reassure Israel after its withdrawal.",
                "An attempt to reassure Israel after its withdrawal is made in Resolution 1125.",
                "After Israel's withdrawal, Resolution 1125 is intended to provide reassurance.",
                "The goal of Resolution 1125 is to reassure Israel following its withdrawal.",
            ],
        },
        {
            text: "It requires the placing of the UNEF on the Egypt-Israel armistice demarcation line.",
            category: "provision",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "It requires the placing of the UNEF on the Egypt-Israel armistice demarcation line.",
                "The placement of the UNEF on the Egypt-Israel armistice line is a requirement.",
                "A requirement is made for the UNEF to be placed on the Egypt-Israel armistice demarcation line.",
                "The Egypt-Israel armistice demarcation line is where the resolution requires the UNEF to be placed.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "followed by", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "however,", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "by requiring", color: "#d299c2" },
    ],
    tags: ["Diplomatic"],
    actors: ["UN Inter-Governmental", "Israel Governmental", "Egypt Governmental"],
    locations: [],
    related_places: [],
    dateOptions: [
        "19 January 1957 - 3 February 1957",
        "2 February 1957",
        "19 January 1956 - 3 February 1956",
        "7 November 1956",
    ],
    locationOptions: [
        "New York, USA",
        "Sharm al-Shaykh, Egypt",
        "Gaza Strip",
        "Sinai Peninsula, Egypt",
    ],
    outcomeOptions: [
        "The UN deplores Israel's failure to withdraw but also seeks to reassure Israel by proposing the placement of UNEF on the demarcation line after withdrawal.",
        "While deploring Israel's failure to withdraw, the UN also tries to reassure Israel by proposing that UNEF be placed on the demarcation line after withdrawal.",
        "A proposal to place UNEF on the demarcation line after withdrawal is made to reassure Israel, even as the UN deplores Israel's failure to withdraw.",
        "The UN's deploring of Israel's non-withdrawal is accompanied by a reassuring proposal to place UNEF on the demarcation line post-withdrawal.",
    ],
  },
  //event92
  // Add this event object to your 'events.ts' file

{
    title: "Israel Refuses Full Withdrawal",
    date: "3 February 1957",
    location: "Israel",
    outcome: "Israel refuses to fully withdraw without guarantees for the Straits of Tiran and suggests UNEF be stationed at Sharm al-Shaykh.",
    storyElements: [
        {
            text: "Israel refuses to withdraw completely from the territories it had occupied.",
            category: "refusal",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Israel refuses to withdraw completely from the territories it had occupied.",
                "A complete withdrawal from the occupied territories is refused by Israel.",
                "The refusal to fully withdraw from the occupied territories is made by Israel.",
                "Israel communicates its refusal to conduct a full withdrawal from the occupied territories.",
            ],
        },
        {
            text: "The refusal is based on the need for assurances that the Straits of Tiran will remain open.",
            category: "condition",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The refusal is based on the need for assurances that the Straits of Tiran will remain open.",
                "Assurances that the Straits of Tiran will stay open are the condition for the withdrawal.",
                "The refusal to withdraw is linked to the demand for guarantees regarding the Straits of Tiran.",
                "Without assurances that the Straits of Tiran will remain open, Israel refuses to withdraw.",
            ],
        },
        {
            text: "Israel suggests that the UNEF be stationed at Sharm al-Shaykh.",
            category: "proposal",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Israel suggests that the UNEF be stationed at Sharm al-Shaykh.",
                "A suggestion is made by Israel for the UNEF to be stationed at Sharm al-Shaykh.",
                "The stationing of the UNEF at Sharm al-Shaykh is proposed by Israel.",
                "Israel's proposal is for the UNEF to be positioned at Sharm al-Shaykh.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "based on", color: "#ff9a9e" },
      { from: 0, to: 2, relationship: "and suggests", color: "#ff9a9e" },
    ],
    tags: ["Diplomatic"],
    actors: ["Israel Governmental", "UN Inter-Governmental"],
    locations: ["Israel", "Egypt", "Sinai"],
    related_places: [],
    dateOptions: [
        "3 February 1957",
        "19 January 1957",
        "2 February 1957",
        "3 January 1957",
    ],
    locationOptions: [
        "Israel",
        "Sharm al-Shaykh, Egypt",
        "Straits of Tiran",
        "New York, USA",
    ],
    outcomeOptions: [
        "Israel refuses to fully withdraw without guarantees for the Straits of Tiran and suggests UNEF be stationed at Sharm al-Shaykh.",
        "A refusal by Israel to fully withdraw is conditioned on guarantees for the Straits of Tiran and a suggestion to station UNEF at Sharm al-Shaykh.",
        "Without guarantees for the Straits of Tiran, Israel refuses to withdraw and suggests placing UNEF at Sharm al-Shaykh.",
        "Israel's refusal to fully withdraw is linked to the need for guarantees for the Straits of Tiran and a proposal for UNEF at Sharm al-Shaykh.",
    ],
  },
  //event93
  // Add this event object to your 'events.ts' file

{
    title: "Pressures and Assurances to Israel on Gulf of Aqaba and Gaza",
    date: "20 February 1957 - 1 March 1957",
    location: "USA",
    outcome: "The US threatens sanctions but offers assurances on the Gulf of Aqaba, while the UN proposes that UNEF take over administration of Gaza.",
    storyElements: [
        {
            text: "President Eisenhower declares that the US would support UN sanctions unless Israel pulls out of Gaza.",
            category: "threat",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "President Eisenhower declares that the US would support UN sanctions unless Israel pulls out of Gaza.",
                "A declaration from President Eisenhower states that the US will support UN sanctions if Israel does not leave Gaza.",
                "Unless Israel withdraws from Gaza, President Eisenhower declares that the US will back UN sanctions.",
                "The support of the US for UN sanctions is declared by President Eisenhower as contingent on Israel not pulling out of Gaza.",
            ],
        },
        {
            text: "The US tells Israel that the Gulf of Aqaba 'comprehends' international waters and allows 'free and innocent passage.'",
            category: "assurance",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 120, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The US tells Israel that the Gulf of Aqaba 'comprehends' international waters and allows 'free and innocent passage.'",
                "Israel is told by the US that the Gulf of Aqaba includes international waters and permits 'free and innocent passage.'",
                "The US communicates to Israel its view that the Gulf of Aqaba is international waters with 'free and innocent passage.'",
                "The American position, as told to Israel, is that the Gulf of Aqaba is international waters allowing for 'free and innocent passage.'",
            ],
        },
        {
            text: "The UN asserts Egypt's right to control the Gaza Strip.",
            category: "affirmation",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The UN asserts Egypt's right to control the Gaza Strip.",
                "Egypt's right to control the Gaza Strip is asserted by the UN.",
                "An assertion of Egypt's right to control the Gaza Strip is made by the UN.",
                "The UN affirms that Egypt has the right to control the Gaza Strip.",
            ],
        },
        {
            text: "It suggests that after Israeli withdrawal, the UNEF would assume administrative and police functions in Gaza.",
            category: "proposal",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#f5f7fa" 
            },
            options: [
                "It suggests that after Israeli withdrawal, the UNEF would assume administrative and police functions in Gaza.",
                "A suggestion is made that the UNEF would take on administrative and police roles in Gaza after Israel withdraws.",
                "The proposal is for the UNEF to assume administrative and police duties in Gaza following an Israeli withdrawal.",
                "After Israel's withdrawal, the UN suggests that the UNEF would handle administrative and police functions in Gaza.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "but also offers", color: "#ff9a9e" },
      { from: 2, to: 3, relationship: "and suggests", color: "#d299c2" },
    ],
    tags: ["Diplomatic", "Sanctions"],
    actors: ["USA Governmental", "UN Inter-Governmental", "Israel Governmental", "Egypt Governmental"],
    locations: ["Gaza Strip", "USA", "Egypt", "Israel"],
    related_places: [],
    dateOptions: [
        "20 February 1957 - 1 March 1957",
        "3 February 1957",
        "1 March 1957",
        "20 January 1957 - 1 February 1957",
    ],
    locationOptions: [
        "Washington D.C., USA",
        "Gaza Strip",
        "Gulf of Aqaba",
        "New York, USA",
    ],
    outcomeOptions: [
        "The US threatens sanctions but offers assurances on the Gulf of Aqaba, while the UN proposes that UNEF take over administration of Gaza.",
        "A US threat of sanctions is paired with assurances on the Gulf of Aqaba, and the UN suggests a UNEF administration for Gaza.",
        "While threatening sanctions, the US gives assurances about the Gulf of Aqaba, as the UN proposes a UNEF takeover of Gaza's administration.",
        "The US both threatens sanctions and offers assurances on the Gulf of Aqaba, and the UN's proposal is for UNEF to administer Gaza.",
    ],
  },
  //event94
  // Add this event object to your 'events.ts' file

{
    title: "Israel Withdraws from Gaza and Sinai",
    date: "7 March 1957 - 12 March 1957",
    location: "Gaza Strip / Sinai Peninsula",
    outcome: "Israel withdraws from Gaza and Sinai, but mass demonstrations in Gaza lead to the swift return of Egyptian control.",
    storyElements: [
        {
            text: "Israel withdraws from Gaza on 7 March and completes its withdrawal from Sinai on 8 March.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Israel withdraws from Gaza on 7 March and completes its withdrawal from Sinai on 8 March.",
                "The withdrawal of Israel from Gaza on 7 March is followed by the completion of its Sinai withdrawal on 8 March.",
                "On 7 March, Israel withdraws from Gaza, and on 8 March, it finishes its withdrawal from Sinai.",
                "A withdrawal from Gaza on 7 March and a completed Sinai withdrawal on 8 March is carried out by Israel.",
            ],
        },
        {
            text: "The withdrawal is based on having achieved guarantees of free passage through the Gulf of Aqaba.",
            category: "justification",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The withdrawal is based on having achieved guarantees of free passage through the Gulf of Aqaba.",
                "Having achieved guarantees of free passage in the Gulf of Aqaba is the basis for the withdrawal.",
                "The reason for the withdrawal is the achievement of guarantees for free passage through the Gulf of Aqaba.",
                "Based on the guarantees of free passage in the Gulf of Aqaba, the withdrawal is made.",
            ],
        },
        {
            text: "Palestinians in Gaza organize mass demonstrations demanding the return of Egypt.",
            category: "reaction",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Palestinians in Gaza organize mass demonstrations demanding the return of Egypt.",
                "Mass demonstrations are organized by Palestinians in Gaza to demand Egypt's return.",
                "The demand for Egypt's return is made by Palestinians in Gaza through mass demonstrations.",
                "In Gaza, mass demonstrations are held by Palestinians who demand that Egypt returns.",
            ],
        },
        {
            text: "Two days later, Egypt's control of Gaza is officially resumed.",
            category: "outcome",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#89f7fe" 
            },
            options: [
                "Two days later, Egypt's control of Gaza is officially resumed.",
                "The official resumption of Egyptian control over Gaza occurs two days later.",
                "After two days, Egypt's control of Gaza is formally re-established.",
                "Two days after the demonstrations, Egypt officially resumes its control of Gaza.",
            ],
        },
    ],
    storyConnections: [
      { from: 1, to: 0, relationship: "based on", color: "#d299c2" },
      { from: 0, to: 2, relationship: "prompting", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "leading to", color: "#ff9a9e" },
    ],
    tags: ["Diplomatic"],
    actors: ["Israel Governmental", "UN Inter-Governmental", "Egypt Governmental", "USA Governmental", "Palestine Non-Governmental"],
    locations: ["Gaza Strip", "Sinai", "Israel", "Egypt"],
    related_places: [],
    dateOptions: [
        "7 March 1957 - 12 March 1957",
        "1 March 1957 - 7 March 1957",
        "10 March 1957 - 12 March 1957",
        "7 February 1957 - 12 February 1957",
    ],
    locationOptions: [
        "Gaza Strip",
        "Sinai Peninsula",
        "Gulf of Aqaba",
        "Sharm al-Shaykh",
    ],
    outcomeOptions: [
        "Israel withdraws from Gaza and Sinai, but mass demonstrations in Gaza lead to the swift return of Egyptian control.",
        "The withdrawal of Israel from Gaza and Sinai is followed by mass demonstrations in Gaza, resulting in the quick return of Egyptian control.",
        "Mass demonstrations in Gaza demanding Egyptian control follow Israel's withdrawal, leading to its swift resumption.",
        "A swift return of Egyptian control to Gaza is the result of mass demonstrations that followed the Israeli withdrawal from the area.",
    ],
  },
  //event95
  // Add this event object to your 'events.ts' file

{
    title: "Fatah Is Founded",
    date: "September 1957",
    location: "Kuwait",
    outcome: "Inspired by the 1956 war, young activists including Yasir Arafat form the first cell of Fatah to organize armed resistance.",
    storyElements: [
        {
            text: "Young activists are inspired by the experience of the Israeli occupation of Gaza during the 1956 war.",
            category: "inspiration",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 120, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Young activists are inspired by the experience of the Israeli occupation of Gaza during the 1956 war.",
                "The experience of the 1956 Israeli occupation of Gaza serves as an inspiration for young activists.",
                "Inspiration is drawn by young activists from the experience of the Israeli occupation of Gaza in 1956.",
                "For young activists, the 1956 Israeli occupation of Gaza provides a key inspiration.",
            ],
        },
        {
            text: "A small group, including Yasir Arafat and Khalil al-Wazir, form the first cell of Fatah.",
            category: "action",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "A small group, including Yasir Arafat and Khalil al-Wazir, form the first cell of Fatah.",
                "The first cell of Fatah is formed by a small group that includes Yasir Arafat and Khalil al-Wazir.",
                "Yasir Arafat and Khalil al-Wazir are part of a small group that creates the first Fatah cell.",
                "The formation of the first cell of Fatah is carried out by a small group including Yasir Arafat and Khalil al-Wazir.",
            ],
        },
        {
            text: "The goal is to involve Palestinians in armed resistance and support popular resistance in Gaza.",
            category: "goal",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The goal is to involve Palestinians in armed resistance and support popular resistance in Gaza.",
                "To support popular resistance in Gaza and involve Palestinians in armed resistance is the goal.",
                "The objective is to engage Palestinians in armed resistance and to back popular resistance in Gaza.",
                "Involving Palestinians in armed resistance and supporting popular resistance in Gaza is the main aim.",
            ],
        },
        {
            text: "The founders formulate two founding documents and begin to recruit other activists.",
            category: "organization",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#89f7fe" 
            },
            options: [
                "The founders formulate two founding documents and begin to recruit other activists.",
                "Two founding documents are formulated by the founders, who also start recruiting other activists.",
                "The formulation of two founding documents and the start of recruitment is done by the founders.",
                "After creating two founding documents, the founders begin to bring in other activists.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "inspiring", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "with the goal to", color: "#a1c4fd" },
      { from: 1, to: 3, relationship: "who then", color: "#a1c4fd" },
    ],
    tags: ["Institutional"],
    actors: ["Palestine Non-Governmental"],
    locations: ["Gaza Strip", "Kuwait"],
    related_places: [],
    dateOptions: [
        "September 1957",
        "March 1957",
        "October 1956",
        "September 1956",
    ],
    locationOptions: [
        "Kuwait",
        "Gaza Strip",
        "Egypt",
        "Lebanon",
    ],
    outcomeOptions: [
        "Inspired by the 1956 war, young activists including Yasir Arafat form the first cell of Fatah to organize armed resistance.",
        "The first cell of Fatah is formed by young activists like Yasir Arafat, who were inspired by the 1956 war to organize armed resistance.",
        "To organize armed resistance, the first Fatah cell is created by young activists, including Yasir Arafat, inspired by the 1956 war.",
        "Young activists, such as Yasir Arafat, are inspired by the 1956 war to form the first cell of Fatah for the purpose of armed resistance.",
    ],
  },
  //event98
  // Add this event object to your 'events.ts' file

{
    title: "Egypt and Syria Unite and Form the United Arab Republic",
    date: "1 February 1958 - 28 September 1961",
    location: "Cairo, Egypt / Damascus, Syria",
    outcome: "Egypt and Syria form the United Arab Republic, but the union is dissolved after a coup in Syria three years later.",
    storyElements: [
        {
            text: "Egypt and Syria formally unite to establish the United Arab Republic (UAR).",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Egypt and Syria formally unite to establish the United Arab Republic (UAR).",
                "The formal unification of Egypt and Syria creates the United Arab Republic (UAR).",
                "To establish the United Arab Republic (UAR), Egypt and Syria formally unite.",
                "The United Arab Republic (UAR) is established through the formal unification of Egypt and Syria.",
            ],
        },
        {
            text: "The union includes the Gaza Strip and allows for other Arab states to join.",
            category: "scope",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The union includes the Gaza Strip and allows for other Arab states to join.",
                "The Gaza Strip is part of the union, which is also open to other Arab states.",
                "Including the Gaza Strip, the union is designed to allow other Arab states to join.",
                "Other Arab states are permitted to join the union, which also includes the Gaza Strip.",
            ],
        },
        {
            text: "A coup d’état in Syria leads to the dissolution of the union.",
            category: "dissolution",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "A coup d’état in Syria leads to the dissolution of the union.",
                "The dissolution of the union is caused by a coup d’état in Syria.",
                "The union is dissolved as a result of a coup d’état in Syria.",
                "A Syrian coup d’état is the event that leads to the union's dissolution.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "but", color: "#a1c4fd" },
    ],
    tags: ["Contextual"],
    actors: ["Egypt Governmental", "Syria Governmental"],
    locations: ["Egypt", "Syria"],
    related_places: [],
    dateOptions: [
        "1 February 1958 - 28 September 1961",
        "28 September 1961",
        "2 September 1971",
        "1 February 1957 - 28 September 1960",
    ],
    locationOptions: [
        "Egypt and Syria",
        "Cairo, Egypt",
        "Damascus, Syria",
        "Gaza Strip",
    ],
    outcomeOptions: [
        "Egypt and Syria form the United Arab Republic, but the union is dissolved after a coup in Syria three years later.",
        "The formation of the United Arab Republic by Egypt and Syria is followed by its dissolution three years later due to a Syrian coup.",
        "A coup in Syria three years after its formation leads to the dissolution of the United Arab Republic, created by Egypt and Syria.",
        "The United Arab Republic, formed by Egypt and Syria, lasts for three years before a coup in Syria causes it to dissolve.",
    ],
  },
  //event99
  // Add this event object to your 'events.ts' file

{
    title: "The Knesset adopts the Basic Law: The Knesset",
    date: "12 February 1958",
    location: "Israel",
    outcome: "A Basic Law is adopted, establishing the constitutional-legal framework for the Knesset, including its location, electoral system, and rules.",
    storyElements: [
        {
            text: "The law establishes the constitutional-legal regime of the Knesset.",
            category: "purpose",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The law establishes the constitutional-legal regime of the Knesset.",
                "The constitutional-legal framework of the Knesset is established by the law.",
                "The establishment of the Knesset's constitutional-legal regime is the purpose of the law.",
                "This law's function is to establish the constitutional-legal regime of the Knesset.",
            ],
        },
        {
            text: "It defines the Knesset's location (Jerusalem), number of members (120), and term of office (four years).",
            category: "details",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It defines the Knesset's location (Jerusalem), number of members (120), and term of office (four years).",
                "The location (Jerusalem), member count (120), and term length (four years) of the Knesset are defined.",
                "Definitions for the Knesset's location (Jerusalem), number of members (120), and term of office (four years) are included.",
                "The law specifies the Knesset's location (Jerusalem), its number of members (120), and their term of office (four years).",
            ],
        },
        {
            text: "It also defines the electoral system (proportional) and procedures.",
            category: "details",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It also defines the electoral system (proportional) and procedures.",
                "The electoral system (proportional) and procedures are also defined.",
                "Definitions for the electoral system (proportional) and its procedures are also part of the law.",
                "Also defined are the procedures and the proportional electoral system.",
            ],
        },
        {
            text: "Article 6 gives every Israeli national aged 21 or older the right to be elected.",
            category: "provision",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Article 6 gives every Israeli national aged 21 or older the right to be elected.",
                "The right to be elected is given by Article 6 to every Israeli national aged 21 and over.",
                "Every Israeli national who is 21 or older has the right to be elected, according to Article 6.",
                "According to Article 6, the right to be elected is granted to all Israeli nationals aged 21 or older.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "defining", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "defining", color: "#a1c4fd" },
      { from: 0, to: 3, relationship: "and stating", color: "#a1c4fd" },
    ],
    tags: ["Legal", "Institutional"],
    actors: ["Israel Governmental"],
    locations: ["Israel"],
    related_places: [],
    dateOptions: [
        "12 February 1958",
        "1 February 1958",
        "12 January 1958",
        "12 February 1957",
    ],
    locationOptions: [
        "Israel",
        "Jerusalem",
        "Tel Aviv",
        "The West Bank",
    ],
    outcomeOptions: [
        "A Basic Law is adopted, establishing the constitutional-legal framework for the Knesset, including its location, electoral system, and rules.",
        "The constitutional-legal framework for the Knesset, including its location, electoral system, and rules, is established by a new Basic Law.",
        "The adoption of a Basic Law creates the constitutional-legal framework for the Knesset, defining its location, electoral system, and rules.",
        "A Basic Law establishes the constitutional-legal framework for the Knesset, which includes its location, electoral system, and rules.",
    ],
  },
  //event100
  // Add this event object to your 'events.ts' file

{
    title: "Basic Law for the Gaza Strip",
    date: "25 February 19_58 - 15 March 1958",
    location: "Gaza Strip",
    outcome: "A Basic Law for Gaza is finally put into force, establishing a Legislative Council with limited powers and appointed members.",
    storyElements: [
        {
            text: "The Basic Law for the Gaza Strip, enacted in 1955, is published in the Gaza Official Gazette.",
            category: "action",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The Basic Law for the Gaza Strip, enacted in 1955, is published in the Gaza Official Gazette.",
                "Published in the Gaza Official Gazette is the Basic Law for the Gaza Strip, which was enacted in 1955.",
                "The 1955 Basic Law for the Gaza Strip is officially published in the Gaza Official Gazette.",
                "The publication of the 1955 Basic Law for the Gaza Strip occurs in the Gaza Official Gazette.",
            ],
        },
        {
            text: "The law includes sections on liberties and rights, and on the three powers of government.",
            category: "content",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The law includes sections on liberties and rights, and on the three powers of government.",
                "Sections on liberties and rights, as well as the three government powers, are included in the law.",
                "The three powers of government and a section on liberties and rights are part of the law's content.",
                "Included in the law are sections dealing with liberties, rights, and the three branches of government.",
            ],
        },
        {
            text: "A Legislative Council with very limited powers is to be formed.",
            category: "provision",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "A Legislative Council with very limited powers is to be formed.",
                "The formation of a Legislative Council with very limited powers is planned.",
                "It is provided that a Legislative Council with very limited powers will be created.",
                "The law calls for the creation of a Legislative Council that has very limited powers.",
            ],
        },
        {
            text: "All members of the council are to be appointed rather than elected.",
            category: "provision",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "All members of the council are to be appointed rather than elected.",
                "Rather than being elected, all council members are to be appointed.",
                "The appointment, not election, of all council members is a provision of the law.",
                "A key provision is that all members of the council will be appointed, not elected.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which includes", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "creating", color: "#a1c4fd" },
      { from: 2, to: 3, relationship: "whose members are", color: "#d299c2" },
    ],
    tags: ["Legal", "Institutional"],
    actors: ["Egypt Governmental", "Palestine Quasi-Governmental"],
    locations: ["Gaza Strip"],
    related_places: [],
    dateOptions: [
        "25 February 1958 - 15 March 1958",
        "11 May 1955",
        "25 February 1958",
        "15 March 1958",
    ],
    locationOptions: [
        "Gaza Strip",
        "Cairo, Egypt",
        "Gaza City",
        "Khan Yunis",
    ],
    outcomeOptions: [
        "A Basic Law for Gaza is finally put into force, establishing a Legislative Council with limited powers and appointed members.",
        "The establishment of a Legislative Council with limited powers and appointed members is the result of a Basic Law for Gaza being enforced.",
        "With the enforcement of a Basic Law for Gaza, a Legislative Council is created with limited powers and appointed members.",
        "A Legislative Council with limited powers and appointed members is formed when a Basic Law for Gaza is finally put into effect.",
    ],
  },
  //evvent101
  // Add this event object to your 'events.ts' file

{
    title: "Civil War in Lebanon",
    date: "May 1958 - October 1958",
    location: "Lebanon",
    outcome: "A civil war erupts in Lebanon, leading to US intervention and ending with the consensus election of Fouad Chehab as president.",
    storyElements: [
        {
            text: "The assassination of a pro-Nasserist journalist ignites widespread strikes and demonstrations.",
            category: "trigger",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "The assassination of a pro-Nasserist journalist ignites widespread strikes and demonstrations.",
                "Widespread strikes and demonstrations are ignited by the assassination of a pro-Nasserist journalist.",
                "The spark for widespread strikes and demonstrations is the assassination of a pro-Nasserist journalist.",
                "After a pro-Nasserist journalist is assassinated, widespread strikes and demonstrations break out.",
            ],
        },
        {
            text: "The conflict pits supporters of President Chamoun against an opposition aligned with the UAR.",
            category: "conflict",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The conflict pits supporters of President Chamoun against an opposition aligned with the UAR.",
                "An opposition aligned with the UAR is pitted against the supporters of President Chamoun.",
                "The two sides of the conflict are President Chamoun's supporters and an opposition backed by the UAR.",
                "The supporters of President Chamoun are in conflict with an opposition that is aligned with the UAR.",
            ],
        },
        {
            text: "US marines deploy at Beirut port and airport.",
            category: "intervention",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "US marines deploy at Beirut port and airport.",
                "The deployment of US marines at Beirut's port and airport takes place.",
                "At the port and airport of Beirut, US marines are deployed.",
                "Beirut's port and airport are the sites of a US marine deployment.",
            ],
        },
        {
            text: "The election of army commander Fouad Chehab as president contributes to the end of the crisis.",
            category: "resolution",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#89f7fe" 
            },
            options: [
                "The election of army commander Fouad Chehab as president contributes to the end of the crisis.",
                "The crisis is helped to end by the election of army commander Fouad Chehab as president.",
                "A contribution to the end of the crisis is the election of army commander Fouad Chehab as president.",
                "The election of Fouad Chehab, the army commander, as president is a key factor in ending the crisis.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "escalating into", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "prompting", color: "#a1c4fd" },
      { from: 1, to: 3, relationship: "which is ended by", color: "#a1c4fd" },
    ],
    tags: ["Contextual"],
    actors: ["Lebanon Non-Governmental", "Lebanon Quasi-Governmental", "USA Governmental", "Egypt Governmental", "Syria Governmental"],
    locations: ["Lebanon", "USA", "Egypt", "Syria"],
    related_places: [],
    dateOptions: [
        "May 1958 - October 1958",
        "14 July 1958",
        "25 October 1958",
        "May 1957 - October 1957",
    ],
    locationOptions: [
        "Lebanon",
        "Beirut",
        "Tripoli",
        "Iraq",
    ],
    outcomeOptions: [
        "A civil war erupts in Lebanon, leading to US intervention and ending with the consensus election of Fouad Chehab as president.",
        "US intervention and the consensus election of Fouad Chehab as president are the results of a civil war in Lebanon.",
        "The end of a civil war in Lebanon, which saw US intervention, is marked by the consensus election of Fouad Chehab.",
        "A consensus election of Fouad Chehab as president ends a Lebanese civil war that had prompted US intervention.",
    ],
  },
  //event102
  // Add this event object to your 'events.ts' file

{
    title: "Anti-Monarchic Coup in Iraq",
    date: "14 July 1958",
    location: "Iraq",
    outcome: "A coup led by General Qasim overthrows the Iraqi monarchy, leading to British intervention in Jordan to prevent a spillover.",
    storyElements: [
        {
            text: "The 1958 coup d'état in Iraq, led by General Qasim, ends the pro-British Hashemite monarchy.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The 1958 coup d'état in Iraq, led by General Qasim, ends the pro-British Hashemite monarchy.",
                "An end to the pro-British Hashemite monarchy in Iraq is brought about by the 1958 coup led by General Qasim.",
                "General Qasim's 1958 coup in Iraq successfully overthrows the pro-British Hashemite monarchy.",
                "The pro-British Hashemite monarchy in Iraq is ended by the 1958 coup d'état, which was led by General Qasim.",
            ],
        },
        {
            text: "Qasim's forces depose King Faisal II, resulting in his assassination.",
            category: "detail",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Qasim's forces depose King Faisal II, resulting in his assassination.",
                "The deposing of King Faisal II by Qasim's forces leads to his assassination.",
                "King Faisal II is deposed by Qasim's forces, which results in his assassination.",
                "The assassination of King Faisal II is the result of him being deposed by Qasim's forces.",
            ],
        },
        {
            text: "British paratroops deploy in Amman to protect Jordan's Hashemite monarchy.",
            category: "reaction",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "British paratroops deploy in Amman to protect Jordan's Hashemite monarchy.",
                "To protect Jordan's Hashemite monarchy, British paratroops are deployed in Amman.",
                "The deployment of British paratroops in Amman is for the protection of Jordan's Hashemite monarchy.",
                "In order to protect the Hashemite monarchy in Jordan, British paratroops are deployed to Amman.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "in which", color: "#ff9a9e" },
      { from: 0, to: 2, relationship: "prompting", color: "#ff9a9e" },
    ],
    tags: ["Contextual"],
    actors: ["Iraq Governmental", "Great Britain Governmental", "USA Governmental", "Jordan Governmental"],
    locations: ["Iraq", "Jordan", "Lebanon"],
    related_places: [],
    dateOptions: [
        "14 July 1958",
        "May 1958",
        "15 July 1958",
        "25 October 1958",
    ],
    locationOptions: [
        "Iraq",
        "Baghdad, Iraq",
        "Amman, Jordan",
        "Lebanon",
    ],
    outcomeOptions: [
        "A coup led by General Qasim overthrows the Iraqi monarchy, leading to British intervention in Jordan to prevent a spillover.",
        "The overthrow of the Iraqi monarchy by a coup under General Qasim prompts British intervention in Jordan to stop a spillover.",
        "British intervention in Jordan is a result of a coup in Iraq, led by General Qasim, which overthrew the monarchy.",
        "To prevent a spillover, the British intervene in Jordan after a coup in Iraq, led by General Qasim, topples the monarchy.",
    ],
  },
  //event103
  // Add this event object to your 'events.ts' file

{
    title: "The Arab League and Palestinian Entity",
    date: "4 March 1959",
    location: "Cairo, Egypt",
    outcome: "The Arab League recommends establishing a Palestinian army and reorganizing the Palestinian people as a distinct entity.",
    storyElements: [
        {
            text: "The Arab League recommends 'establishing a Palestinian army in the Arab host countries.'",
            category: "recommendation",
            position: { x: 150, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The Arab League recommends 'establishing a Palestinian army in the Arab host countries.'",
                "A recommendation to establish a Palestinian army in Arab host countries is made by the Arab League.",
                "The establishment of a Palestinian army in Arab host countries is recommended by the Arab League.",
                "It is recommended by the Arab League that a Palestinian army be established in Arab host countries.",
            ],
        },
        {
            text: "It also recommends 'reorganizing the Palestinian people...as an entity...through representatives chosen by the Palestinian people.'",
            category: "recommendation",
            position: { x: 650, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 120, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It also recommends 'reorganizing the Palestinian people...as an entity...through representatives chosen by the Palestinian people.'",
                "The reorganization of the Palestinian people as an entity with chosen representatives is also recommended.",
                "A further recommendation is to reorganize the Palestinian people as an entity with their own chosen representatives.",
                "Also recommended is the reorganization of the Palestinian people into an entity with representatives they choose themselves.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "and also", color: "#a1c4fd" },
    ],
    tags: ["Policy-Program", "Institutional"],
    actors: ["Arab League Inter-Governmental"],
    locations: ["Arab League"],
    related_places: [],
    dateOptions: [
        "4 March 1959",
        "14 July 1958",
        "4 February 1959",
        "4 March 1958",
    ],
    locationOptions: [
        "Cairo, Egypt",
        "Damascus, Syria",
        "Amman, Jordan",
        "Beirut, Lebanon",
    ],
    outcomeOptions: [
        "The Arab League recommends establishing a Palestinian army and reorganizing the Palestinian people as a distinct entity.",
        "A recommendation is made by the Arab League to create a Palestinian army and to reorganize the Palestinian people as an entity.",
        "The establishment of a Palestinian army and the reorganization of the Palestinian people as an entity are recommended by the Arab League.",
        "As a recommendation from the Arab League, a Palestinian army should be formed and the Palestinian people reorganized as an entity.",
    ],
  },
  //event103
  // Add this event object to your 'events.ts' file

{
    title: "Lebanon Establishes the Department of Palestinian Refugee Affairs at the Ministry of Interior",
    date: "31 March 1959",
    location: "Lebanon",
    outcome: "A new department is created within the Lebanese Ministry of Interior to manage all affairs related to Palestinian refugees.",
    storyElements: [
        {
            text: "Legislative Decree No. 42 creates a Department for Palestinian Refugee Affairs.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Legislative Decree No. 42 creates a Department for Palestinian Refugee Affairs.",
                "A Department for Palestinian Refugee Affairs is created by Legislative Decree No. 42.",
                "The creation of a Department for Palestinian Refugee Affairs is done by Legislative Decree No. 42.",
                "By Legislative Decree No. 42, a Department for Palestinian Refugee Affairs is established.",
            ],
        },
        {
            text: "It is entrusted with caring for issues related to Palestinian refugees.",
            category: "mission",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It is entrusted with caring for issues related to Palestinian refugees.",
                "The care of issues related to Palestinian refugees is entrusted to it.",
                "Its trust is to care for the issues that are related to Palestinian refugees.",
                "It is given the responsibility of caring for matters concerning Palestinian refugees.",
            ],
        },
        {
            text: "Decree No. 927 defines its functions, including liaising with UNRWA and processing documents.",
            category: "details",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Decree No. 927 defines its functions, including liaising with UNRWA and processing documents.",
                "The functions of the department, such as liaising with UNRWA and document processing, are defined in Decree No. 927.",
                "A definition of its functions, including working with UNRWA and handling documents, is given in Decree No. 927.",
                "Its functions, like liaising with UNRWA and processing documents, are outlined by Decree No. 927.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which is", color: "#a1c4fd" },
      { from: 1, to: 2, relationship: "whose functions are defined in", color: "#d299c2" },
    ],
    tags: ["Institutional", "Legal"],
    actors: ["Lebanon Governmental", "UN Inter-Governmental"],
    locations: ["Lebanon"],
    related_places: [],
    dateOptions: [
        "31 March 1959",
        "4 March 1959",
        "31 April 1959",
        "31 March 1958",
    ],
    locationOptions: [
        "Lebanon",
        "Beirut",
        "Syria",
        "Jordan",
    ],
    outcomeOptions: [
        "A new department is created within the Lebanese Ministry of Interior to manage all affairs related to Palestinian refugees.",
        "To manage all affairs of Palestinian refugees, a new department is established in the Lebanese Ministry of Interior.",
        "The management of all Palestinian refugee affairs is the task of a new department created in the Lebanese Ministry of Interior.",
        "Within the Lebanese Ministry of Interior, a new department is formed to handle all matters concerning Palestinian refugees.",
    ],
  },
  //event104
  // Add this event object to your 'events.ts' file

{
    title: "Arab States Protest Jewish Immigration",
    date: "11 May 1959",
    location: "New York, USA",
    outcome: "Ten Arab states at the UN jointly submit a letter to the Secretary General expressing 'grave concern' over Jewish immigration to Israel.",
    storyElements: [
        {
            text: "Representatives of the 10-member Arab states at the UN present a joint letter to the Secretary General.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Representatives of the 10-member Arab states at the UN present a joint letter to the Secretary General.",
                "A joint letter is presented to the Secretary General by representatives of the 10 Arab states at the UN.",
                "The presentation of a joint letter to the Secretary General is made by the representatives of the 10 UN Arab states.",
                "To the Secretary General, a joint letter is submitted by the representatives of the 10 Arab states at the UN.",
            ],
        },
        {
            text: "The letter expresses 'grave concern' about 'Jewish immigration into the Israeli-occupied territory of Palestine.'",
            category: "content",
            position: { x: 400, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 120, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The letter expresses 'grave concern' about 'Jewish immigration into the Israeli-occupied territory of Palestine.'",
                "'Grave concern' over 'Jewish immigration into the Israeli-occupied territory of Palestine' is expressed in the letter.",
                "The letter's content expresses 'grave concern' regarding 'Jewish immigration into the Israeli-occupied territory of Palestine.'",
                "An expression of 'grave concern' about 'Jewish immigration into the Israeli-occupied territory of Palestine' is the focus of the letter.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which expresses", color: "#a1c4fd" },
    ],
    tags: ["Diplomatic", "Colonization"],
    actors: ["Arab League Inter-Governmental", "UN Inter-Governmental"],
    locations: [],
    related_places: [],
    dateOptions: [
        "11 May 1959",
        "31 March 1959",
        "11 April 1959",
        "11 May 1958",
    ],
    locationOptions: [
        "New York, USA",
        "Cairo, Egypt",
        "Jerusalem",
        "The West Bank",
    ],
    outcomeOptions: [
        "Ten Arab states at the UN jointly submit a letter to the Secretary General expressing 'grave concern' over Jewish immigration to Israel.",
        "A joint letter expressing 'grave concern' over Jewish immigration to Israel is submitted to the Secretary General by ten Arab states at the UN.",
        "The expression of 'grave concern' about Jewish immigration to Israel is the subject of a joint letter from ten Arab states to the UN Secretary General.",
        "To the UN Secretary General, a joint letter from ten Arab states is sent, expressing 'grave concern' about Jewish immigration to Israel.",
    ],
  },
  //event105
  // Add this event object to your 'events.ts' file

{
    title: "Fatah's Organizational Structure Set in a Kuwait Meeting",
    date: "10 October 1959",
    location: "Kuwait",
    outcome: "Fatah's Central Committee is formally established, with Yasser Arafat elected as its chairman, solidifying the movement's structure.",
    storyElements: [
        {
            text: "Fatah holds a crucial meeting in Kuwait to establish its formal organizational structure.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Fatah holds a crucial meeting in Kuwait to establish its formal organizational structure.",
                "To establish its formal organizational structure, Fatah convenes a key meeting in Kuwait.",
                "A meeting is held by Fatah in Kuwait for the purpose of setting up its formal organizational structure.",
                "The establishment of Fatah's formal organizational structure is the subject of a crucial meeting in Kuwait.",
            ],
        },
        {
            text: "The movement's Central Committee is officially established during this meeting.",
            category: "decision",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The movement's Central Committee is officially established during this meeting.",
                "During this meeting, the official establishment of the movement's Central Committee occurs.",
                "The official creation of the Central Committee of the movement happens at this meeting.",
                "This meeting is where the movement's Central Committee is formally established.",
            ],
        },
        {
            text: "Yasser Arafat is elected as the chairman of the Central Committee.",
            category: "decision",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "Yasser Arafat is elected as the chairman of the Central Committee.",
                "The election for the chairman of the Central Committee is won by Yasser Arafat.",
                "As chairman of the Central Committee, Yasser Arafat is elected.",
                "The position of chairman of the Central Committee is filled by the election of Yasser Arafat.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "where", color: "#a1c4fd" },
      { from: 1, to: 2, relationship: "and where", color: "#d299c2" },
    ],
    tags: ["Institutional"],
    actors: ["Palestine Non-Governmental"],
    locations: ["Kuwait"],
    related_places: [],
    dateOptions: [
        "10 October 1959",
        "September 1957",
        "10 September 1959",
        "10 October 1958",
    ],
    locationOptions: [
        "Kuwait",
        "Gaza Strip",
        "Beirut, Lebanon",
        "Cairo, Egypt",
    ],
    outcomeOptions: [
        "Fatah's Central Committee is formally established, with Yasser Arafat elected as its chairman, solidifying the movement's structure.",
        "The formal establishment of Fatah's Central Committee and the election of Yasser Arafat as chairman solidifies the movement's structure.",
        "A solid structure for the movement is created with the formal establishment of Fatah's Central Committee and Yasser Arafat's election as chairman.",
        "The movement's structure is solidified when Fatah's Central Committee is formally established and Yasser Arafat is elected its chairman.",
    ],
  },
  //event106
  // Add this event object to your 'events.ts' file

{
    title: "Iraq and a 'Palestinian Republic'",
    date: "15 December 1959",
    location: "Iraq",
    outcome: "In a challenge to Nasser, Iraq's leader proposes the establishment of a 'Palestinian Republic,' starting in the West Bank and Gaza.",
    storyElements: [
        {
            text: "Competing with Nasser, Iraq's leader General Qasim proposes establishing a 'Palestinian Republic.'",
            category: "proposal",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 110, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Competing with Nasser, Iraq's leader General Qasim proposes establishing a 'Palestinian Republic.'",
                "A proposal to establish a 'Palestinian Republic' is made by Iraq's leader, General Qasim, in competition with Nasser.",
                "In an effort to compete with Nasser, General Qasim of Iraq proposes the creation of a 'Palestinian Republic.'",
                "The establishment of a 'Palestinian Republic' is proposed by General Qasim of Iraq as a challenge to Nasser.",
            ],
        },
        {
            text: "Its sovereignty would unfold first in the West Bank and the Gaza Strip.",
            category: "plan",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "Its sovereignty would unfold first in the West Bank and the Gaza Strip.",
                "The first stage of its sovereignty would be in the West Bank and the Gaza Strip.",
                "In the West Bank and Gaza Strip is where its sovereignty would initially be established.",
                "The plan is for its sovereignty to begin in the West Bank and the Gaza Strip.",
            ],
        },
        {
            text: "It would then expand to include the Palestinian territories occupied in 1948.",
            category: "plan",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "It would then expand to include the Palestinian territories occupied in 1948.",
                "An expansion to include the Palestinian territories occupied in 1948 would follow.",
                "The next step would be to expand and include the Palestinian territories from 1948.",
                "Afterward, it would expand its territory to include the Palestinian lands occupied in 1948.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which would start in", color: "#a1c4fd" },
      { from: 1, to: 2, relationship: "and then", color: "#d299c2" },
    ],
    tags: ["Policy-Program", "Institutional"],
    actors: ["Iraq Governmental", "Egypt Governmental"],
    locations: ["Iraq", "West Bank", "Gaza Strip"],
    related_places: [],
    dateOptions: [
        "15 December 1959",
        "10 October 1959",
        "15 November 1959",
        "15 December 1958",
    ],
    locationOptions: [
        "Iraq",
        "Egypt",
        "The West Bank",
        "Gaza Strip",
    ],
    outcomeOptions: [
        "In a challenge to Nasser, Iraq's leader proposes the establishment of a 'Palestinian Republic,' starting in the West Bank and Gaza.",
        "A proposal for a 'Palestinian Republic' starting in the West Bank and Gaza is made by Iraq's leader to compete with Nasser.",
        "Iraq's leader challenges Nasser by proposing a 'Palestinian Republic' that would begin in the West Bank and Gaza.",
        "The establishment of a 'Palestinian Republic,' beginning in the West Bank and Gaza, is proposed by Iraq's leader in a move against Nasser.",
    ],
  },
  //evnt107
  // Add this event object to your 'events.ts' file

{
    title: "Status of Jordanian Jerusalem Municipality Enhanced Symbolically",
    date: "16 December 1959",
    location: "Jerusalem",
    outcome: "Jordan amends a law to symbolically enhance the status of the Jerusalem municipality by changing its name and jurisdiction.",
    storyElements: [
        {
            text: "Jordan enacts an amendment to the Municipality Law of 1955.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Jordan enacts an amendment to the Municipality Law of 1955.",
                "An amendment to the 1955 Municipality Law is enacted by Jordan.",
                "The enactment of an amendment to the Municipality Law of 1955 is done by Jordan.",
                "Jordan passes an amendment to its 1955 Municipality Law.",
            ],
        },
        {
            text: "It changes the name of the Jerusalem municipality from 'baladiyya' to 'amana'.",
            category: "change",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "It changes the name of the Jerusalem municipality from 'baladiyya' to 'amana'.",
                "The name of the Jerusalem municipality is changed from 'baladiyya' to 'amana'.",
                "A change in the name of the Jerusalem municipality from 'baladiyya' to 'amana' is made.",
                "From 'baladiyya' to 'amana' is how the name of the Jerusalem municipality is changed.",
            ],
        },
        {
            text: "It places the municipality under the jurisdiction of the Prime Minister instead of the Interior Minister.",
            category: "change",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 120, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "It places the municipality under the jurisdiction of the Prime Minister instead of the Interior Minister.",
                "The municipality is moved from the Interior Minister's jurisdiction to the Prime Minister's.",
                "Jurisdiction over the municipality is transferred from the Interior Minister to the Prime Minister.",
                "Instead of the Interior Minister, the municipality is now under the Prime Minister's jurisdiction.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "and", color: "#a1c4fd" },
    ],
    tags: ["Legal", "Institutional"],
    actors: ["Jordan Governmental"],
    locations: ["Jerusalem", "Jordan"],
    related_places: [],
    dateOptions: [
        "16 December 1959",
        "15 December 1959",
        "28 November 1956",
        "16 December 1955",
    ],
    locationOptions: [
        "Jerusalem",
        "Amman, Jordan",
        "The West Bank",
        "Israel",
    ],
    outcomeOptions: [
        "Jordan amends a law to symbolically enhance the status of the Jerusalem municipality by changing its name and jurisdiction.",
        "To symbolically enhance its status, Jordan amends a law, changing the Jerusalem municipality's name and jurisdiction.",
        "The symbolic enhancement of the Jerusalem municipality's status is achieved through a Jordanian law amendment that changes its name and jurisdiction.",
        "A change of name and jurisdiction for the Jerusalem municipality is enacted by Jordan to symbolically enhance its status.",
    ],
  },
  //event108
  // Add this event object to your 'events.ts' file

{
    title: "Mahmoud Darwish Publishes First Book of Poetry, 'Asafeer bila Ajniha (Wingless Birds)'",
    date: "1960",
    location: "Israel",
    outcome: "Mahmoud Darwish publishes his first poetry collection, marking the beginning of his emergence as a major Palestinian literary voice.",
    storyElements: [
        {
            text: "Mahmoud Darwish, at the age of 19, publishes his first book of poetry.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Mahmoud Darwish, at the age of 19, publishes his first book of poetry.",
                "The first book of poetry by Mahmoud Darwish is published when he is 19 years old.",
                "At 19 years of age, Mahmoud Darwish's first poetry collection is published.",
                "The publication of his first book of poetry by Mahmoud Darwish occurs at the age of 19.",
            ],
        },
        {
            text: "The collection is titled 'Asafeer bila Ajniha' (Wingless Birds).",
            category: "detail",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The collection is titled 'Asafeer bila Ajniha' (Wingless Birds).",
                "'Asafeer bila Ajniha' (Wingless Birds) is the title of the collection.",
                "The title of the poetry collection is 'Asafeer bila Ajniha' (Wingless Birds).",
                "It is called 'Asafeer bila Ajniha' (Wingless Birds).",
            ],
        },
        {
            text: "The poems express themes of Palestinian identity, love, and longing for homeland.",
            category: "themes",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The poems express themes of Palestinian identity, love, and longing for homeland.",
                "Themes of Palestinian identity, love, and a longing for homeland are expressed in the poems.",
                "An expression of themes such as Palestinian identity, love, and longing for home is found in the poems.",
                "The poems are about themes of Palestinian identity, love, and the longing for one's homeland.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "titled", color: "#a1c4fd" },
      { from: 0, to: 2, relationship: "which expresses", color: "#a1c4fd" },
    ],
    tags: ["Cultural"],
    actors: ["Palestine Non-Governmental"],
    locations: ["Israel"],
    related_places: [],
    dateOptions: [
        "1960",
        "1959",
        "1961",
        "1964",
    ],
    locationOptions: [
        "Israel",
        "Haifa, Israel",
        "Nazareth, Israel",
        "Beirut, Lebanon",
    ],
    outcomeOptions: [
        "Mahmoud Darwish publishes his first poetry collection, marking the beginning of his emergence as a major Palestinian literary voice.",
        "The publication of his first poetry collection by Mahmoud Darwish marks his emergence as a major voice in Palestinian literature.",
        "A major Palestinian literary voice begins to emerge with the publication of Mahmoud Darwish's first poetry collection.",
        "The start of Mahmoud Darwish's rise as a major Palestinian literary figure is marked by the publication of his first book of poetry.",
    ],
  },
  //event109
  // Add this event object to your 'events.ts' file

{
    title: "Israel's Strike Against Syria",
    date: "31 January 1960 - 15 February 1960",
    location: "Syria",
    outcome: "Following increased tensions, the Israeli army launches a major strike, destroying Syrian positions and the village of Tawfiq.",
    storyElements: [
        {
            text: "Tensions along the Israeli-Syrian border increase.",
            category: "context",
            position: { x: 100, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#c3cfe2" 
            },
            options: [
                "Tensions along the Israeli-Syrian border increase.",
                "An increase in tensions occurs along the Israeli-Syrian border.",
                "The border between Israel and Syria sees a rise in tensions.",
                "Along the Israeli-Syrian border, tensions become heightened.",
            ],
        },
        {
            text: "The Israeli army launches a major strike against Syrian military positions.",
            category: "action",
            position: { x: 400, y: 300 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "The Israeli army launches a major strike against Syrian military positions.",
                "A major strike is launched by the Israeli army against Syrian military positions.",
                "Syrian military positions are the target of a major strike by the Israeli army.",
                "The launching of a major strike against Syrian military positions is done by the Israeli army.",
            ],
        },
        {
            text: "The strike is on the eastern shore of Lake Tiberias.",
            category: "location",
            position: { x: 700, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The strike is on the eastern shore of Lake Tiberias.",
                "On the eastern shore of Lake Tiberias is where the strike takes place.",
                "The location of the strike is the eastern shore of Lake Tiberias.",
                "The eastern shore of Lake Tiberias is the site of the strike.",
            ],
        },
        {
            text: "The village of Tawfiq is also destroyed.",
            category: "consequence",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 260, 
                height: 80, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The village of Tawfiq is also destroyed.",
                "The destruction of the village of Tawfiq also occurs.",
                "Also destroyed is the village of Tawfiq.",
                "In addition, the village of Tawfiq is destroyed.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "leading to", color: "#c3cfe2" },
      { from: 1, to: 2, relationship: "located", color: "#ff9a9e" },
      { from: 1, to: 3, relationship: "and", color: "#ff9a9e" },
    ],
    tags: ["Violence"],
    actors: ["Israel Governmental", "Syria Governmental"],
    locations: ["Syria", "Israel"],
    related_places: [],
    dateOptions: [
        "31 January 1960 - 15 February 1960",
        "15 February 1960",
        "31 December 1959 - 15 January 1960",
        "31 January 1959 - 15 February 1959",
    ],
    locationOptions: [
        "Lake Tiberias, Syria",
        "Golan Heights, Syria",
        "Damascus, Syria",
        "Tawfiq, Syria",
    ],
    outcomeOptions: [
        "Following increased tensions, the Israeli army launches a major strike, destroying Syrian positions and the village of Tawfiq.",
        "A major Israeli strike, which destroyed Syrian positions and the village of Tawfiq, follows a period of increased tensions.",
        "Increased tensions lead to a major strike by the Israeli army, which results in the destruction of Syrian positions and the village of Tawfiq.",
        "The destruction of Syrian positions and the village of Tawfiq is the result of a major Israeli strike that was preceded by increased tensions.",
    ],
  },
  //event110
  // Add this event object to your 'events.ts' file

{
    title: "Iraqi Government Announces Formation of a 'Palestinian Liberation Regiment'",
    date: "26 March 1960",
    location: "Iraq",
    outcome: "Iraq announces the formation of a Palestinian Liberation Regiment as part of its policy to create a Palestinian Republic.",
    storyElements: [
        {
            text: "The Iraqi government announces the formation of a 'Palestinian Liberation Regiment.'",
            category: "announcement",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "The Iraqi government announces the formation of a 'Palestinian Liberation Regiment.'",
                "An announcement on the formation of a 'Palestinian Liberation Regiment' is made by the Iraqi government.",
                "The formation of a 'Palestinian Liberation Regiment' is announced by the Iraqi government.",
                "A 'Palestinian Liberation Regiment' will be formed, according to an announcement from the Iraqi government.",
            ],
        },
        {
            text: "This is a continuation of General Qasim's 1959 proposal to establish a 'Palestinian Republic.'",
            category: "context",
            position: { x: 400, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "This is a continuation of General Qasim's 1959 proposal to establish a 'Palestinian Republic.'",
                "The 1959 proposal by General Qasim for a 'Palestinian Republic' is continued with this action.",
                "This action follows on from General Qasim's 1959 proposal to create a 'Palestinian Republic.'",
                "It is a further step in General Qasim's 1959 plan for the establishment of a 'Palestinian Republic.'",
            ],
        },
    ],
    storyConnections: [
      { from: 1, to: 0, relationship: "leading to", color: "#d299c2" },
    ],
    tags: ["Institutional"],
    actors: ["Iraq Governmental"],
    locations: ["Iraq"],
    related_places: [],
    dateOptions: [
        "26 March 1960",
        "15 December 1959",
        "26 February 1960",
        "26 March 1959",
    ],
    locationOptions: [
        "Iraq",
        "Baghdad",
        "Egypt",
        "Syria",
    ],
    outcomeOptions: [
        "Iraq announces the formation of a Palestinian Liberation Regiment as part of its policy to create a Palestinian Republic.",
        "As part of its policy for a Palestinian Republic, the Iraqi government announces the formation of a Palestinian Liberation Regiment.",
        "The formation of a Palestinian Liberation Regiment is announced by Iraq, in line with its policy to create a Palestinian Republic.",
        "An announcement is made by Iraq about the formation of a Palestinian Liberation Regiment, which is part of its plan for a Palestinian Republic.",
    ],
  },
  //event111
  // Add this event object to your 'events.ts' file

{
    title: "Lebanon Establishes a Higher Commission for Palestine Affairs",
    date: "26 April 1960",
    location: "Lebanon",
    outcome: "Lebanon creates a 'Higher Commission for Palestine Affairs' to study the issue, monitor developments, and combat Zionist activity.",
    storyElements: [
        {
            text: "Lebanon issues Decree No. 3909 establishing a 'Higher Commission for Palestine Affairs.'",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Lebanon issues Decree No. 3909 establishing a 'Higher Commission for Palestine Affairs.'",
                "A 'Higher Commission for Palestine Affairs' is established by Lebanon through Decree No. 3909.",
                "The establishment of a 'Higher Commission for Palestine Affairs' in Lebanon is done via Decree No. 3909.",
                "Through Decree No. 3909, Lebanon creates a 'Higher Commission for Palestine Affairs.'",
            ],
        },
        {
            text: "This is in keeping with a 1959 resolution of the Arab League.",
            category: "context",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 90, 
                edgeColor: "#f5f7fa" 
            },
            options: [
                "This is in keeping with a 1959 resolution of the Arab League.",
                "A 1959 resolution from the Arab League is the basis for this action.",
                "The action is taken in accordance with a 1959 Arab League resolution.",
                "This is done to comply with a 1959 resolution from the Arab League.",
            ],
        },
        {
            text: "The commission's mandate includes studying the Palestine cause and preparing solutions.",
            category: "mandate",
            position: { x: 400, y: 450 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The commission's mandate includes studying the Palestine cause and preparing solutions.",
                "Studying the Palestine cause and preparing solutions is part of the commission's mandate.",
                "The mandate of the commission includes the study of the Palestine cause and the preparation of solutions.",
                "Among the commission's duties is to study the Palestine cause and get solutions ready.",
            ],
        },
        {
            text: "It is also tasked with tracking Zionist activity abroad and preparing measures to combat it.",
            category: "mandate",
            position: { x: 650, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#ff9a9e" 
            },
            options: [
                "It is also tasked with tracking Zionist activity abroad and preparing measures to combat it.",
                "The tracking of Zionist activity abroad and the preparation of measures to combat it is also a task.",
                "Another part of its mandate is to track Zionist activity abroad and prepare counter-measures.",
                "It also has the job of monitoring Zionist activity abroad and getting measures ready to fight it.",
            ],
        },
    ],
    storyConnections: [
      { from: 1, to: 0, relationship: "prompting", color: "#f5f7fa" },
      { from: 0, to: 2, relationship: "with mandate to", color: "#a1c4fd" },
      { from: 0, to: 3, relationship: "and", color: "#a1c4fd" },
    ],
    tags: ["Institutional", "Legal"],
    actors: ["Lebanon Governmental", "Arab League Inter-Governmental"],
    locations: ["Lebanon"],
    related_places: [],
    dateOptions: [
        "26 April 1960",
        "3 September 1959",
        "26 March 1960",
        "26 April 1959",
    ],
    locationOptions: [
        "Lebanon",
        "Beirut",
        "Cairo, Egypt",
        "Syria",
    ],
    outcomeOptions: [
        "Lebanon creates a 'Higher Commission for Palestine Affairs' to study the issue, monitor developments, and combat Zionist activity.",
        "A 'Higher Commission for Palestine Affairs' is created by Lebanon to study the issue, track developments, and counter Zionist activity.",
        "To study the Palestine issue, monitor its developments, and combat Zionist activity, Lebanon establishes a 'Higher Commission for Palestine Affairs'.",
        "The establishment of a 'Higher Commission for Palestine Affairs' in Lebanon is for the purpose of studying the issue, monitoring developments, and fighting Zionist activity.",
    ],
  },
  //event112
  // Add this event object to your 'events.ts' file

{
    title: "Fatah and the Palestinian Entity",
    date: "June 1960",
    location: "Beirut, Lebanon",
    outcome: "Fatah's journal, 'Filastinuna', calls for the creation of a 'revolutionary entity' in the West Bank and Gaza.",
    storyElements: [
        {
            text: "Filastinuna (Our Palestine), a journal issued by Fatah, makes a call.",
            category: "action",
            position: { x: 400, y: 150 },
            style: { 
                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", 
                color: "#333", 
                width: 260, 
                height: 100, 
                edgeColor: "#a1c4fd" 
            },
            options: [
                "Filastinuna (Our Palestine), a journal issued by Fatah, makes a call.",
                "A call is made by Filastinuna (Our Palestine), a Fatah-issued journal.",
                "The Fatah journal, Filastinuna (Our Palestine), issues a call.",
                "From the Fatah journal Filastinuna (Our Palestine), a call is made.",
            ],
        },
        {
            text: "The journal calls for 'having a revolutionary entity in the remaining part of our homeland.'",
            category: "call_to_action",
            position: { x: 400, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)", 
                color: "#333", 
                width: 250, 
                height: 110, 
                edgeColor: "#d299c2" 
            },
            options: [
                "The journal calls for 'having a revolutionary entity in the remaining part of our homeland.'",
                "A call for a 'revolutionary entity in the remaining part of our homeland' is made by the journal.",
                "The creation of a 'revolutionary entity in the remaining part of our homeland' is what the journal calls for.",
                "The journal's call is for the establishment of a 'revolutionary entity in the remaining part of our homeland.'",
            ],
        },
        {
            text: "This refers to the West Bank and Gaza Strip.",
            category: "clarification",
            position: { x: 150, y: 350 },
            style: { 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
                color: "#333", 
                width: 250, 
                height: 80, 
                edgeColor: "#f5f7fa" 
            },
            options: [
                "This refers to the West Bank and Gaza Strip.",
                "The West Bank and Gaza Strip is what this refers to.",
                "The reference is to the West Bank and Gaza Strip.",
                "This is in reference to the West Bank and Gaza Strip.",
            ],
        },
    ],
    storyConnections: [
      { from: 0, to: 1, relationship: "which calls for", color: "#a1c4fd" },
      { from: 1, to: 2, relationship: "referring to", color: "#d299c2" },
    ],
    tags: ["Policy-Program", "Institutional"],
    actors: ["Palestine Non-Governmental"],
    locations: ["Gaza Strip", "West Bank"],
    related_places: [],
    dateOptions: [
        "June 1960",
        "October 1959",
        "July 1960",
        "June 1959",
    ],
    locationOptions: [
        "Beirut, Lebanon",
        "Gaza Strip",
        "West Bank",
        "Kuwait",
    ],
    outcomeOptions: [
        "Fatah's journal, 'Filastinuna', calls for the creation of a 'revolutionary entity' in the West Bank and Gaza.",
        "A call for a 'revolutionary entity' in the West Bank and Gaza is made by Fatah's journal, 'Filastinuna'.",
        "The creation of a 'revolutionary entity' in the West Bank and Gaza is the subject of a call from Fatah's journal 'Filastinuna'.",
        "'Filastinuna', the journal of Fatah, issues a call for the establishment of a 'revolutionary entity' in the West Bank and Gaza.",
    ],
  },
  //event113
  

]
