import { BRAND, CONTACT } from "../home/data";

/**
 * Privacy and terms copy.
 *
 * Written to describe what this site actually does, not from a generic template: it sets no
 * cookies, runs no analytics and loads nothing from a third-party domain, and saying so plainly is
 * both true today and more reassuring than boilerplate about cookie categories that do not exist.
 *
 * The four open points were settled by the owner on 24 Sep 2026 and written in below: a 24-month
 * retention period for enquiries, the founder named as the grievance contact under the DPDP Act,
 * the registered entity name, and jurisdiction at Silvassa. They follow ordinary Indian practice
 * for a professional consultancy and are the client's to change.
 *
 * A solicitor should still read both pages. Nothing here is legal advice.
 *
 * IF ANALYTICS IS EVER ADDED, the "no cookies" statements stop being true and a consent banner
 * becomes necessary. Change this file in the same commit that adds the tracker.
 */

export interface LegalSection {
  heading: string;
  body: string[];
  /** Rendered as a bulleted list under the paragraphs. */
  list?: string[];
}

export interface LegalDoc {
  eyebrow: string;
  title: string;
  standfirst: string;
  updated: string;
  sections: LegalSection[];
}

const UPDATED = "24 September 2026";

export const PRIVACY: LegalDoc = {
  eyebrow: "Legal",
  title: "Privacy policy",
  standfirst:
    "What this website collects, what it does not, and what happens to anything you send us.",
  updated: UPDATED,
  sections: [
    {
      heading: "Who this is about",
      body: [
        `This site is published by ${BRAND.registeredName} ("${BRAND.legalName}"), ${CONTACT.address.join(", ")}. We decide how any personal information collected through it is used. For anything in this policy you can reach us at ${CONTACT.email} or ${CONTACT.phone}.`,
      ],
    },
    {
      heading: "This site sets no cookies",
      body: [
        "Browsing this website places no cookies on your device. There is no analytics, no advertising pixel and no social media tracker on any page.",
        "Typefaces and images are served from this website's own domain rather than from a third party, so simply opening a page does not report your visit to anyone else. Nothing you read here is recorded against you.",
      ],
    },
    {
      heading: "What our host records",
      body: [
        "This website is hosted by Netlify. Like any web host, its servers keep short-lived technical logs — the IP address a request came from, the page requested, the time, and the browser's own description of itself. These exist so the service can be run and abuse prevented. We do not use them to build any profile of you, and we do not combine them with anything else.",
      ],
    },
    {
      heading: "If you use the enquiry form",
      body: [
        "The contact form asks for your name, email address, company and a description of your project. You choose what to put in it. We ask for the email address only so that we can reply.",
        "Submissions are delivered through Netlify Forms and then emailed to us. We use what you send to answer your enquiry and to carry out any work that follows from it. We do not add you to a mailing list, and we do not sell, rent or trade your details.",
        "We keep enquiries for 24 months from your last contact with us, so that we can pick up a conversation you return to and keep a record of advice already given. After that they are deleted. If you would like yours removed sooner, ask and we will do it.",
      ],
    },
    {
      heading: "Who else sees it",
      body: [
        "Only the people who need to, and only for the reasons above:",
      ],
      list: [
        "Netlify, which hosts the site and receives form submissions on our behalf.",
        "Our email provider, which carries the message to us.",
        "Anyone we are legally required to disclose it to.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "Under India's Digital Personal Data Protection Act 2023 you may ask us what personal information we hold about you, ask us to correct it if it is wrong, and ask us to erase it. If you are in the UK or the European Union, equivalent rights apply to you under the UK GDPR and the GDPR.",
        `Write to ${CONTACT.person} at ${CONTACT.email}, or call ${CONTACT.phone}. He is the grievance contact for the purposes of the DPDP Act and will answer within 30 days, which is the period the Act allows.`,
      ],
    },
    {
      heading: "Children",
      body: [
        "This is a website for an industrial construction practice. It is not directed at children and we do not knowingly collect information from them.",
      ],
    },
    {
      heading: "Changes",
      body: [
        "If this policy changes, the revised version appears on this page with a new date at the top. If the change is significant — for example if we begin using analytics — we will say so here rather than quietly amend the wording.",
      ],
    },
  ],
};

export const TERMS: LegalDoc = {
  eyebrow: "Legal",
  title: "Terms and conditions",
  standfirst: "The terms on which this website is made available to you.",
  updated: UPDATED,
  sections: [
    {
      heading: "These terms",
      body: [
        `This website is operated by ${BRAND.registeredName}, trading as ${BRAND.legalName}. By using it you accept these terms. If you do not accept them, please do not use the site.`,
      ],
    },
    {
      heading: "What the information here is, and is not",
      body: [
        "The pages describing our services, stages and past work are published to explain how we work and to help you decide whether to speak to us. They are general information, not professional advice, and nothing on this site creates an engineering, architectural or advisory relationship between us.",
        "Statutory requirements, approval sequences and timelines differ by plot, by use and by authority, and they change. Do not act on anything here as though it applied to your site without asking us about your site.",
        "Descriptions of completed projects are summaries. They do not state the full scope, the commercial terms or the parties involved, and they are not an offer to repeat any of it on the same terms.",
      ],
    },
    {
      heading: "Our material",
      body: [
        `The text, photographs, drawings, layout and the ${BRAND.legalName} name and mark on this site belong to us or are used by us with permission. You may read the site, and print or download pages for your own reference or to evaluate working with us. You may not republish, sell or pass off any of it as your own, and you may not reproduce it commercially without our written consent.`,
      ],
    },
    {
      heading: "Other companies' trademarks",
      body: [
        "This site shows the names and marks of organisations we have delivered work for. Each of those marks belongs to the company it identifies. They are shown to indicate who we have worked with, and they do not imply that any of those companies endorses, sponsors or is affiliated with us.",
      ],
    },
    {
      heading: "Links to other sites",
      body: [
        "Where this site links somewhere else, we do not control that destination and we are not responsible for its content or its handling of your information.",
      ],
    },
    {
      heading: "Availability and liability",
      body: [
        "We work to keep this site accurate and available, but we do not guarantee that it will be uninterrupted, error-free, or current at every moment. We may change or withdraw any part of it without notice.",
        "To the extent the law allows, we are not liable for any loss arising from your use of this site or from reliance on information published on it. Nothing in these terms limits any liability that cannot lawfully be limited.",
      ],
    },
    {
      heading: "Governing law",
      body: [
        "These terms are governed by the laws of India. The courts at Silvassa, in the Union Territory of Dadra and Nagar Haveli and Daman and Diu, have exclusive jurisdiction over any dispute arising from them.",
      ],
    },
    {
      heading: "Contact",
      body: [
        `Questions about these terms: ${CONTACT.email}, or ${CONTACT.address.join(", ")}.`,
      ],
    },
  ],
};
