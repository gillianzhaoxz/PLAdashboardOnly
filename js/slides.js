const slides = [
  {
    title: "Philadelphia",
    content: `
      Despite being one of the oldest cities in the US, the city of Philadelphia
      has the particularity of having a great number of vacant land available,
      even close to its center core. This phenomenon can be in part attributed
      to the discriminatory practices of the Home Owners’ Loan Corporation, also
      known as ‘redlining’, over the middle of the 20th century, which prevented
      the majority black residents of South, North and West Philly to access
      loans.
      <br></br>
      While much of these areas remained vacant over the last 80 years, this
      trend is changing as the city’s population continues to grow.
      `,
    phase: 'philadelphia',
    //showpopups: true,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
  },
  {
    title: "La Finquita",
    content: `
      Despite being one of the oldest cities in the US, the city of Philadelphia
      has the particularity of having a great number of vacant land available,
      even close to its center core. This phenomenon can be in part attributed
      to the discriminatory practices of the Home Owners’ Loan Corporation, also
      known as ‘redlining’, over the middle of the 20th century, which prevented
      the majority black residents of South, North and West Philly to access
      loans.
      <br></br>
      While much of these areas remained vacant over the last 80 years, this
      trend is changing as the city’s population continues to grow.
      `,
    phase: 'philadelphia',
    //showpopups: true,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
  },

  {
    title: "Expanding development",
    content: `
      Over the last decade, the real estate market in Philadelphia has grown
      exponentially and continues to do so at an accelerating pace. In 2021 the
      record number of permits approved by the city tripled those of an average
      year.
      <br></br>
      A great number of apartment buildings, such as the one highlighted
      here, have popped up over the last years, on many occasions taking
      advantage of the cheap vacant land available.
      <br></br>
      <img src='img/slide01_studios.jpg' alt='Apartment building'>
    `,
    phase: 'development',
    showpopups: true,
  },

  {
    title: "...into Majority Minority Neighborhoods",
    content: `
      However, when we put this into perspective, it is evident that this
      development is expanding towards neighborhoods whose residents are mostly
      part of a racial minority.
    `,
    phase: 'minority',
    // showpopups: true,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
  },

  {
    title: "...and into below-median Income Neighborhoods",
    content: `
      And also, below the median household income in Philadelphia. This presents
      the risk that these residents, most of whom have long lived in these
      neighborhoods, and who mostly do not own their homes, could be displaced
      by rising rents and predatory development practices.
    `,
    phase: 'income',
    // showpopups: true,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
  },

  {
    title: "The development frontier: Kensington",
    content: `
      A neighborhood representative of this change is Kensington, in north
      Philadelphia. Here, new development has poured into the neighborhood from
      the east (coming from Fishtown) and the south (coming from the intensively
      densified Northern Liberties).
    `,
    phase: 'kensington',
    // showpopups: true,
    bounds: [[39.96869, -75.14654], [39.98648, -75.13045]]
  },

  {
    title: "Vacant Lots in Kensington",
    content: `
      By looking at the available vacant lots remaining in Kensington, it is
      possible to devise how the south-east half of the neighborhood lots have
      been developed and most of the available ones remain at the north-west
      end.
    `,
    phase: 'vacantLand',
    // showpopups: true,
    bounds: [[39.96869, -75.14654], [39.98648, -75.13045]]
  },

  {
    title: "Three Vacant Lots near Germantown Ave.",
    content: `
      For example, these three vacant plots, close to Germantown Ave., have been
      engulfed with new apartment buildings on the block they are located, and
      it is very possible they will soon be built on.
      <br></br>
      <img src='img/slide07_germantown.png' alt='Vacant Lot in Germantown'>
    `,
    phase: 'vacantLandZoom',
    showpopups: true,
  },

  {
    title: "Vacant Lots and Real Estate Delinquencies",
    content: `
      To understand how developers can swiftly obtain these vacant lots, we can
      observe that many of them are tax delinquent, due to unpaid Real Estate
      Taxes to the City of Philadelphia.
      <br></br>
      Much of these properties have accumulated debt over decades because their
      owners had no interest or opportunity to sell or built on them.
    `,
    phase: 'vacantLand',
    // showpopups: true,
    bounds: [[39.96869, -75.14654], [39.98648, -75.13045]]
  },

  {
    title: "Delinquent Properties in Kensington",
    content: `
      Kensington is no exemption, as many of the vacant lots remaining are also
      real estate tax delinquent. This gives developers and edge over individual
      buyers, since they have the resources to pay debt that would have to be
      paid on top of the selling price.
    `,
    phase: 'delinquent',
    // showpopups: true,
    bounds: [[39.96869, -75.14654], [39.98648, -75.13045]]
  },

  {
    title: "US Bank Liens in Philadelphia",
    content: `
      To further complicate the situation, in an attempt to fund its public
      schools, in 1995 the City of Philadelphia sold many of the liens (or
      property debt) owed to them to a private entity: the US Bank of New
      York. Over the last couple of years, and probably in response to the
      booming real estate, the US Bank has begun to foreclose on these
      properties all over the city.
    `,
    phase: 'usBank',
    // showpopups: true,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
  },

  {
    title: "...and in Kensington",
    content: `
      Kensington is no exemption to these foreclosures.
    `,
    phase: 'usBankZoom',
    // showpopups: true,
    bounds: [[39.96869, -75.14654], [39.98648, -75.13045]]
  },

  {
    title: "Sheriff Sales",
    content: `
      The foreclosures for properties that are tax delinquent take place through
      a ‘Sheriff Sale’, on which residents of the communities around these lots
      have no priority or first option to buy.
    `,
    phase: 'sheriff',
    // showpopups: true,
    bounds: [[39.96869, -75.14654], [39.98648, -75.13045]]
  },

  {
    title: "La Finquita",
    content: `
      Many neighbors of these vacant lots have reasons to try to avoid them
      going into a developer’s hands. In particular, given how long these lots
      have remained empty, many of them lots have been taken care by the
      community around them.
      <br></br>
      Here, in Kensington, a plot that had turned to a
      community garden and urban farm by a group of neighbors, dubbed
      ‘La Finquita’ (the little farm), was purchased and cleared by a developer
      in 2016, even though it had been cared for by other people since 1988.
      <br></br>
      <img src='img/slide09_finquita.jpg' alt='Community Garden'>
    `,
    phase: 'sheriffZoom',
    showpopups: true,
  },
  {
    title: "Cesar Iglesias Community Garden",
    content: `
      Across Philadelphia, many other thriving community gardens exist on
      delinquent vacant land owned by the US Bank or the City. Further north and
      behind the ‘development wave’ process, a group of neighbors is fighting to
      keep the Cesar Andreu Community Garden theirs. The garden was opened in
      2012 but has recently been partially bought by a private developer and is
      at risk of being closed.
      <br></br>
      <img src='img/slide10_cesar.png' alt='Community Garden'>
    `,
    phase: 'garden',
  },
  {
    title: "Thank you.",
    content: `
      `,
    phase: 'philadelphia',
    //showpopups: true,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
  }
];
