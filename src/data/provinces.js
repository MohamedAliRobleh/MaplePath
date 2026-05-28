export const provinces = [
  { code: 'ON', nom: 'Ontario', capitale: 'Toronto', sante: { nom: 'OHIP', delai: 90, lien: 'https://www.ontario.ca/fr/page/ohip' } },
  { code: 'QC', nom: 'Québec', capitale: 'Québec', sante: { nom: 'RAMQ', delai: 90, lien: 'https://www.ramq.gouv.qc.ca' }, special: 'Règles spéciales' },
  { code: 'BC', nom: 'Colombie-Britannique', capitale: 'Victoria', sante: { nom: 'MSP BC', delai: 90, lien: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp' } },
  { code: 'AB', nom: 'Alberta', capitale: 'Edmonton', sante: { nom: 'AHCIP', delai: 90, lien: 'https://www.alberta.ca/ahcip' } },
  { code: 'MB', nom: 'Manitoba', capitale: 'Winnipeg', sante: { nom: 'Manitoba Health', delai: 0, lien: 'https://www.gov.mb.ca/health/mhsip/' } },
  { code: 'SK', nom: 'Saskatchewan', capitale: 'Regina', sante: { nom: 'Saskatchewan Health', delai: 90, lien: 'https://www.ehealthsask.ca' } },
  { code: 'NS', nom: 'Nouvelle-Écosse', capitale: 'Halifax', sante: { nom: 'MSI', delai: 90, lien: 'https://novascotia.ca/dhw/msi/' } },
  { code: 'NB', nom: 'Nouveau-Brunswick', capitale: 'Fredericton', sante: { nom: 'NB Medicare', delai: 90, lien: 'https://www2.gnb.ca/content/gnb/fr/departments/health/MedicarePrescriptionDrugPlan.html' } },
  { code: 'PE', nom: 'Île-du-Prince-Édouard', capitale: 'Charlottetown', sante: { nom: 'PEI Medicare', delai: 90, lien: 'https://www.princeedwardisland.ca/en/topic/pei-health-card' } },
  { code: 'NL', nom: 'Terre-Neuve-et-Labrador', capitale: "St. John's", sante: { nom: 'MCP', delai: 90, lien: 'https://www.gov.nl.ca/hcs/mcp/' } },
  { code: 'YT', nom: 'Yukon', capitale: 'Whitehorse', sante: { nom: 'Yukon Health', delai: 0, lien: 'https://yukon.ca/en/health-and-wellness' } },
  { code: 'NT', nom: 'Territoires du Nord-Ouest', capitale: 'Yellowknife', sante: { nom: 'NWT Health', delai: 0, lien: 'https://www.hss.gov.nt.ca' } },
  { code: 'NU', nom: 'Nunavut', capitale: 'Iqaluit', sante: { nom: 'Nunavut Health', delai: 0, lien: 'https://www.gov.nu.ca/health' } },
  { code: 'XX', nom: 'Je ne sais pas encore', capitale: null, sante: null },
]

export const getProvince = (code) => provinces.find(p => p.code === code) || provinces[0]
