import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// search query: [Washington state, engineering, new grad]
export const config = {
  sites: [
    {
      name: 'Google',
      url: 'https://www.google.com/about/careers/applications/jobs/results/?location=Washington%2C%20USA&target_level=EARLY&degree=BACHELORS&employment_type=FULL_TIME&sort_by=date&skills=Early%20Career',
      selector: '#yDmH0d > c-wiz.zQTmif.SSPGKf > div > div:nth-child(2) > div > div > div.BiNgOe.E2Mxid > main > div > c-wiz > div',
    },
    {
      name: 'Snap',
      url: 'https://careers.snap.com/jobs?team=Engineering&role=Engineering&type=Regular&q=entry+level&q=university&q=new+grad&q=L3',
      selector: 'body > main > section > div.css-puhxlh > div > article > div > div',
    },
    {
      name: 'Netflix',
      url: 'https://explore.jobs.netflix.net/careers?query=washington%20engineer&pid=790301800170&domain=netflix.com&sort_by=relevance&triggerGoButton=false',
      selector: '#pcs-body-container > div:nth-child(2) > div.search-results-main-container > div > div.inline-block.position-cards-container > div > div:nth-child(2)',
    },
    {
      name: 'Microsoft',
      url: 'https://jobs.careers.microsoft.com/global/en/search?lc=Washington%2C%20United%20States&p=Software%20Engineering&d=Software%20Engineering&exp=Students%20and%20graduates&rt=Individual%20Contributor&et=Full-Time&l=en_us&pg=1&pgSz=20&o=Relevance&flt=true',
      selector: '#job-search-app > div',
    },
    {
      name: 'AirBnB',
      url: 'https://careers.airbnb.com/positions/?_search_input=new%20grad&_offices=united-states&_jobs_sort=updated_at',
      selector: 'body > div.wrapper > div:nth-child(3) > div.inner-flex.mb-12',
    },    
    {
      name: 'Apple',
      url: 'https://jobs.apple.com/en-us/search?sort=relevance&key=university+new%252520grad+entry%252520level&location=seattle-SEA&team=apps-and-frameworks-SFTWR-AF+cloud-and-infrastructure-SFTWR-CLD+core-operating-systems-SFTWR-COS+devops-and-site-reliability-SFTWR-DSR+engineering-project-management-SFTWR-EPM+information-systems-and-technology-SFTWR-ISTECH+machine-learning-and-ai-SFTWR-MCHLN+security-and-privacy-SFTWR-SEC+software-quality-automation-and-tools-SFTWR-SQAT+wireless-software-SFTWR-WSFT',
      selector: '#search-results',
    },
    {
      name: 'Tesla',
      url: 'https://www.tesla.com/careers/search/?type=1&region=5&site=US&state=WA&query=new%20grad',
      selector: '#app > div',
    },
    {
      name: 'Block (Square)',
      url: 'https://block.xyz/careers/jobs?businessUnits[]=square&businessUnits[]=block&businessUnits[]=cashapp&businessUnits[]=spiral&businessUnits[]=afterpay&businessUnits[]=proto&employeeTypes[]=Regular&locations[]=Seattle%2C%20WA%2C%20US&teams[]=Machine%20Learning%2FData%20Science&teams[]=Software%20Engineering&teams[]=Information%20Technology&teams[]=Hardware',
      selector: '#jobs-list-filters',
    },
    {
      name: 'Figma (early career)',
      url: 'https://www.figma.com/careers/#job-openings',
      selector: '#job-openings > div > div.css-qzyf42 > div:nth-child(1) > div:nth-child(3)',
    },
    {
      name: 'Figma (engineering)',
      url: 'https://www.figma.com/careers/#job-openings',
      selector: '#job-openings > div > div.css-qzyf42 > div:nth-child(1) > div:nth-child(4)',
    },
    {
      name: 'GitHub',
      url: 'https://www.github.careers/careers-home/jobs?page=1&tags5=Individual%20Contributor&locations=,,United%20States&categories=Engineering&sortBy=posted_date&descending=true',
      selector: '#all-content > search-app > search-base-search-holder > search-results > div > div',
    },
    {
      name: 'Amazon',
      url: 'https://www.amazon.jobs/en/search?offset=0&result_limit=10&sort=recent&category%5B%5D=software-development&job_type%5B%5D=Full-Time&country%5B%5D=USA&state%5B%5D=Washington&city%5B%5D=Seattle&city%5B%5D=Bellevue&city%5B%5D=Redmond&category_type=studentprograms&distanceType=Mi&radius=80km&industry_experience=less_than_1_year&is_manager%5B%5D=0&latitude=47.60357&longitude=-122.32945&loc_group_id=&loc_query=Seattle%2C%20WA%2C%20United%20States&base_query=&city=Seattle&country=USA&region=Washington&county=King&query_options=&',
      selector: '#main-content > div.search-page > div > div > div.container > content > div > div > div.col-md-8.search-page-job-list > div:nth-child(2)',
    },
    {
      name: 'DoorDash',
      url: 'https://careersatdoordash.com/job-search/?intern=1&keyword=&location=&department=Engineering%7C&spage=1',
      selector: '#content > section.px-5.pt-10 > div > div.results',
    },
    {
      name: 'ByteDance',
      url: 'https://jobs.bytedance.com/en/position?keywords=&category=&location=CT_157&project=7322364513776093449&type=2&job_hot_flag=&current=1&limit=10&functionCategory=&tag=',
      selector: '#bd > section > section > main > div > div.content__IN8vJ > div.rightBlock.rightBlock__2ZGFh > div:nth-child(1)',
    },
    {
      name: 'TikTok',
      url: 'https://lifeattiktok.com/search?keyword=Technology&recruitment_id_list=&job_category_id_list=&subject_id_list=7322364513776093449%2C7459986622530078983&location_code_list=CT_157&limit=12&offset=0',
      selector: 'body > div.overflow-x-hidden > div.flex.justify-center.job-list-container > div > div > div.flex.flex-col.w-full',
    },
    {
      name: 'Atlassian',
      url: 'https://wac-cdn-a.atlassian.com/company/careers/all-jobs?team=Graduates&location=United%20States&search=',
      selector: '#imkt-jsx--0406b5ec > div > div:nth-child(5)',
    },
    {
      name: 'Duolingo',
      url: 'https://careers.duolingo.com/?location=Seattle%2C+WA#careers',
      selector: '#careers',
    },
    {
      name: 'Dropbox',
      url: 'https://jobs.dropbox.com/teams/engineering',
      selector: '#main > div.jc02-open-positions > div > div.open-positions__groups > div > div.open-positions__listing-group-div > ul',
    },
    {
      name: 'Pinterest',
      url: 'https://www.pinterestcareers.com/jobs/?search=&location=Seattle&team=Engineering&team=University&type=Regular&pagesize=20#results',
      selector: '#results',
    },
    {
      name: 'SpaceX',
      url: 'https://www.spacex.com/careers/jobs/?location=woodinville%252C%2520wa&type=regular',
      selector: '#jobs-list',
    },
    {
      name: 'Salesforce (Tableau)',
      url: 'https://careers.salesforce.com/en/jobs/?search=&country=United+States+of+America&region=Washington&location=Bellevue&location=Remote&location=Seattle&type=Full+time&jobtype=New+Grads&pagesize=20#results',
      selector: '#results',
    },
    {
      name: 'MongoDB',
      url: 'https://app.ripplematch.com/v2/public/company/mongodb',
      selector: '#main > div > div > div:nth-child(4) > div:nth-child(2)',
    },
    {
      name: 'Zoom',
      url: 'https://careers.zoom.us/jobs/search?page=1&category_uids%5B%5D=b79264f5877fa58df2bb612887751822&category_uids%5B%5D=8d5fb973de9f83d0b046212bdb459dbb&country_codes%5B%5D=US&cities%5B%5D=Seattle&query=',
      selector: '#page_block_2_0 > form > div > div > div.col-md-9.col-xs-12.col-12',
    },
    {
      name: 'Databricks',
      url: 'https://www.databricks.com/company/careers/open-positions?department=University%20Recruiting&location=Washington',
      selector: '#jobWrap',
    },
    {
      name: 'Snowflake',
      url: 'https://careers.snowflake.com/us/en/search-results?keywords=bellevue',
      selector: 'body > div.ph-page > div.body-wrapper.ph-page-container > div > div > div > div.col-md-8.col-sm-7.jobresults-right-column > section:nth-child(2) > div > div > div > div:nth-child(1)',
    },
    {
      name: 'Cloudflare',
      url: 'https://www.cloudflare.com/careers/jobs/?department=Engineering&location=Seattle%2C+US',
      selector: '#jobs-list',
    },
    {
      name: 'Adobe',
      url: 'https://careers.adobe.com/us/en/c/engineering-and-product-jobs',
      selector: 'body > div.ph-page > div.body-wrapper.ph-page-container > div > div > div > div.col-lg-9.col-md-8.col-sm-7 > section:nth-child(1) > div > div > div > div:nth-child(1) > div.phs-jobs-list > div.content-block',
    },
    {
      name: 'Visa',
      url: 'https://corporate.visa.com/en/jobs/?categories=Software%20Development%2FEngineering&categories=Software%20Quality%20Assurance%20and%20Testing&categories=Technology%20and%20Operations&categories=Systems%20%26%20Database%20Admin,%20Analysis,%20Design&categories=Data%20Architect%2FEngineering%2FScience&categories=Data%20Science%2FData%20Engineering&categories=Information%20Technology&functions=Product&functions=Technology&cities=Bellevue&cities=Washington',
      selector: '#results',
    },
    {
      name: 'f5',
      url: 'https://ffive.wd5.myworkdayjobs.com/f5jobs?locations=6150e291faa30123a8f15f16659ae804&CF_-_Job_Posting_Category_Extended=ebc0867ff0da10015d4881e40be60000&workerSubType=7a119632acd0109fce74c72825633006',
      selector: '#mainContent > div > div.css-1142bqn > section',
    },
    {
      name: 'Stripe',
      url: 'https://stripe.com/jobs/search?teams=University&remote_locations=North+America--US+Remote&office_locations=North+America--Seattle',
      selector: '#MktContent > div > section.Section.JobsSearchListingSection.Section--paddingNormal.Section--hasGuides > div > div.Section__container > div > div > section',
    },
    {
      name: 'Hiya',
      url: 'https://www.hiya.com/company/careers#careers-list',
      selector: 'body > div > div',
    },
    {
      name: 'Signal',
      url: 'https://signal.org/workworkwork/',
      selector: '#signal > section:nth-child(4) > div:nth-child(2)',
    },
    {
      name: 'Redfin',
      url: 'https://careers.redfin.com/us/en/search-results?keywords=washington%20software%20engineer',
      selector: '#skip-facet',
    },
    {
      name: 'Nutanix',
      url: 'https://careers.nutanix.com/en/jobs/?search=&country=United+States&location=Washington&team=Engineering&pagesize=20#results',
      selector: '#results',
    },
    {
      name: 'Qualtrics',
      url: 'https://www.qualtrics.com/careers/us/en/search-results?m=3&keywords=engineer&location=Seattle%2C%20Washington%2C%20United%20States',
      selector: 'body > div.ph-page > div.body-wrapper.ph-page-container > div > div > div > div.col-md-8.col-sm-7.jobresults-right-column > section:nth-child(2) > div > div > div > div.phs-jobs-list',
    },
    {
      name: 'Uber',
      url: 'https://www.uber.com/us/en/careers/list/?location=USA-Washington-Seattle&department=Engineering&department=University&team=Engineering',
      selector: '#main',
    },
    {
      name: 'IBM',
      url: 'https://www.ibm.com/careers/search?field_keyword_08[0]=Software%20Engineering&field_keyword_18[0]=Entry%20Level&field_keyword_05[0]=United%20States',
      selector: '#ibm-hits-wrapper',
    },
    {
      name: 'Docusign',
      url: 'https://careers.docusign.com/jobs?categories=University%20%26%20New%20Grad&page=1&locations=Seattle,Washington,United%20States&tags1=Regular',
      selector: '#all-content',
    },
    {
      name: 'Zillow',
      url: 'https://zillow.wd5.myworkdayjobs.com/Zillow_Group_External?locations=f40b9d6c2e7e106cff1b7456d157077d&locations=76d84517207210c0ae04392fff1ae612&locations=76d84517207210c0ae044056e60ae621&locations=76d84517207210c0ae043e019fb2e61c&locations=0b71ea84e3241049641e8519d8ff02a3&locations=f40b9d6c2e7e106cff5f6a7ed8e107dc&locations=0b71ea84e324104964c6dd0a324202c8&locations=c8e2d13628e71058190200d0f7253703&locations=0b71ea84e32410496457f7e3fa9302ac&locations=76d84517207210c0ae04369cfffae60d&locations=76d84517207210c0ae0442a9de8ae626&locations=76d84517207210c0ae042f9587eae5fe&locations=e843d806ae9410c8040005b62f02d624&locations=bf3166a9227a01f8b514f0b00b147bc9&locations=76d84517207210c0ae0423975342e5e5&timeType=156fb9a2f01c10be203b6e91581a01d1&workerSubType=156fb9a2f01c10bed80e140d011a9559&jobFamilyGroup=a90eab1aaed6105e8dd41df427a82ee6',
      selector: '#mainContent',
    },
    {
      name: 'JPMC',
      url: 'https://jpmc.fa.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1001/jobs?keyword=Technology&lastSelectedFacet=CATEGORIES&location=WA%2C+United+States&locationId=300000020657215&locationLevel=state&mode=location&selectedCategoriesFacet=300000086152753',
      selector: '#main',
    },
    {
      name: 'American Express',
      url: 'https://aexp.eightfold.ai/careers?location=Seattle%2C%20Washington%2C%20United%20States&Select%20Primary%20Career%20Areas=technology&Role%20Type=professional%20%28band%2040%20and%20below%29&Select%20Seniority=Entry%20Level&domain=aexp.com&sort_by=relevance&hl=en&triggerGoButton=false',
      selector: '#main-container',
    },
    {
      name: 'Morgan Stanley',
      url: 'https://www.morganstanley.com/careers/career-opportunities-search?opportunity=sg#',
      selector: '#maincontent',
    },
    {
      name: 'Workday',
      url: 'https://workday.wd5.myworkdayjobs.com/Workday_Early_Career',
      selector: '#mainContent > div > div.css-1142bqn > section',
    },
    {
      name: 'Ebay',
      url: 'https://jobs.ebayinc.com/us/en/search-results?qstate=Washington&qcountry=United%20States%20of%20America',
      selector: '#acc-skip-content > div.body-wrapper.ph-page-container > div > div > div > div.col-md-8.col-sm-7',
    },
    {
      name: 'X',
      url: 'https://careers.x.com/en',
      selector: '#main > div > div.src__BoxElement-EDYfg.lmyQbK.ac02-box.aem-container > div > div.src__BoxElement-EDYfg.lmyQbK.ac02-box.aem-container > div.ac03-stack--full-width > div.src__BoxElement-EDYfg.dQrBe.ac02-box.aem-container > div > div.src__StackContainer-jhtMMW.hKrSAM.atm-reset-list-counter.ac03-stack.aem-container > div.src__StackItemElem-iqmOUd.eTxaRR > div > div.src__GridContainer-cKcsmU.kioaBJ.atm-reset-list-counter.ac01-grid.aem-container > div > div > div > div.ac03-stack--full-width > div.src__StackContainer-jhtMMW.hKrSAM.atm-reset-list-counter.ac03-stack.aem-container > div.src__StackItemElem-iqmOUd.iXDORx > div > div:nth-child(1) > div > div > div.grid-item__Item-dCtxOM.blDKDw > div',
    },
    {
      name: 'Oracle',
      url: 'https://careers.oracle.com/jobs/#en/sites/jobsearch/jobs?lastSelectedFacet=AttributeChar6&location=United+States&locationId=300000000149325&selectedFlexFieldsFacets=%22AttributeChar29%7CIndividual+Contributor%7C%7CAttributeChar13%7CCampus%7C%7CAttributeChar6%7C0+to+2%2B+years%22&selectedLocationsFacet=100000000731910',
      selector: '#main > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div > div > div',
    },
    {
      name: 'Anduril',
      url: 'https://www.anduril.com/open-roles/?location=Seattle%2C+Washington%2C+United+States_Remote&department=&search=&gh_src=',
      selector: '#__next > div > div.Wrapper.Wrapper--active > div > div > div > div.JobListing.JobListing_element__Cy_Yt > div:nth-child(6) > div.JobListing_jobListContent__Pc98R',
    },
    {
      name: 'Blue Origin',
      url: 'https://www.blueorigin.com/careers/search?location=Arlington%2C+WA%3BSeattle%2C+WA&category=Developer+-+Software+Engineer&employmentType=Regular',
      selector: '#main > section:nth-child(2) > div',
    },
    {
      name: 'Intel',
      url: 'https://intel.wd1.myworkdayjobs.com/en-US/External?shared_id=YzNiNDdlOTgtMjk4Yi00NTU4LTk5MjktODFkNzVlNDcwN2M0&locations=1e4a4eb3adf101cc4e292078bf8199d0&locations=1e4a4eb3adf101770f350977bf8193cf&jobFamilyGroup=ace7a3d23b7e01a0544279031a0ec85c&workerSubType=dc8bf79476611087dfde9c6b065bae76',
      selector: '#search-results-list',
    },
    {
      name: 'Datadog',
      url: 'https://careers.datadoghq.com/all-jobs/?remote%5B0%5D=Remote&location_Americas%5B0%5D=Washington',
      selector: '#job-openings',
    },
    {
      name: 'Splunk',
      url: 'https://www.splunk.com/en_us/careers/search-jobs.html?page=1&type=Full-Time&location=Washington%2C+United+States',
      selector: '#careerOverview',
    },
    {
      name: 'Okta',
      url: 'https://app.ripplematch.com/v2/public/company/okta?tl=aa34db13#cbp-jobs',
      selector: '#main > div > div > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > section > div:nth-child(1)',
    },
    {
      name: 'Expedia',
      url: 'https://careers.expediagroup.com/jobs/?keyword=engineer&filter%5Bcategory%5D=Technology&filter%5Bjobfamily%5D=&filter%5Bcountry%5D=United+States&filter%5Bstate%5D=Washington&filter%5Bcity%5D=',
      selector: 'body > main > section.Results > div > div',
    },
    {
      name: 'Intuit',
      url: 'https://jobs.intuit.com/search-jobs/engineer/Washington%2C%20US/27595/1/3/6252001-5815135/47x50012/-120x50147/50/2',
      selector: '#content > div.search-results.section4 > div.section4__inner-wrapper > div.section4__results-wrapper',
    },
    {
      name: 'Twilio',
      url: 'https://www.twilio.com/en-us/company/jobs',
      selector: '#open-positions > div.position-column > div.position-feed',
    },
    // TODO: add , Slack, Wish, Bloomberg, Paypal, Scale AI, Waymo, Cruise
    {
      name: 'Lyft',
      url: 'https://www.lyft.com/careers#openings?location=seattle%252C%2520wa&category=software%2520engineering',
      selector: '#openings > div > div > div.sc-q480ss-0.euPhRP > div:nth-child(6)'
    },
    {
      name: 'Yelp (remote)',
      url: 'https://www.yelp.careers/us/en/search-results?keywords=engineer',
      selector: 'body > div.ph-page > div.body-wrapper.ph-page-container > div > div > div > div.col-md-8.col-sm-7.jobresults-right-column > section:nth-child(2) > div > div > div > div:nth-child(1)'
    },
    {
      name: 'Slack',
      url: 'https://slack.com/careers/dept/software-engineering/type/regular',
      selector: '#main > section.o-section--job-listings.v--borderless > div:nth-child(6)'
    },
    {
      name: 'Wish',
      url: 'https://www.wish.com/careers/jobs',
      selector: '#react-app > div > div.CareerSection__Wrapper-sc-11sddeu-0.kAUQja > div > div.CareerSection__ChildrenWrapper-sc-11sddeu-5.kHewLs > div'
    },
    {
      name: 'Bloomberg',
      url: 'https://bloomberg.avature.net/careers/SearchJobs/?1686=%5B55478%5D&1686_format=2312&2562=%5B219290%5D&2562_format=6594&listFilterMode=1&jobRecordsPerPage=12&',
      selector: '#main > div > div > section'
    },
    {
      name: 'PayPal',
      url: 'https://paypal.eightfold.ai/careers?query=Recent%20grad&location=Seattle&domain=paypal.com&sort_by=relevance&location_distance_km=160&triggerGoButton=true',
      selector: '#pcs-body-container > div:nth-child(2) > div.accordion > div > div'
    },
    {
      name: 'Scale AI',
      url: 'https://scale.com/careers#open-roles',
      selector: '#jobs > div.w-full > div > div.w-full.ρi.ρtQ4Nh > div:nth-child(1)'
    },
    {
      name: 'Waymo',
      url: 'https://careers.withwaymo.com/jobs/search?page=1&department_uids%5B%5D=451e57010e816b71a8312792faf5740f&employment_type_uids%5B%5D=2ea50d7de0fbb2247d09474fbb5ee4da&country_codes%5B%5D=US&states%5B%5D=Washington&dropdown_field_1_uids%5B%5D=032bf1b3c966086ebe1d0cd037cd2eef&query=',
      selector: '#page_block_1_0 > form > div > div > div.col-md-9.col-xs-12.col-12 > div'
    },
    {
      name: 'Reddit',
      url: 'https://redditinc.com/careers',
      selector: '#jobs-16253'
    },
    {
      name: 'UiPath',
      url: 'https://www.uipath.com/careers/jobs',
      selector: '#root'
    },
    {
      name: 'Indeed',
      url: 'https://www.indeed.com/cmp/Indeed/jobs?q=&l=Washington+State',
      selector: '#cmp-container > div > div.dd-privacy-allow.css-u74ql7.eu4oa1w0 > div.css-u74ql7.eu4oa1w0'
    }
  ],
  paths: {
    snapshots: path.join(__dirname, './snapshots'),
    logs: path.join(__dirname, './logs'),
    debug: path.join(__dirname, './debug'),
  },
  concurrency: 5,
  browser: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1920,1080',
      '--disable-extensions',
      '--disable-features=site-per-process',
    ],
    defaultViewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
  }
};