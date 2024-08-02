import React,{useState} from 'react'
import ExamFAQPage from './ExamFAQ/ExamFAQPage';

function FAQMainPage() {
    const [activeTab, setActiveTab] = useState('exam');

  return (
    <div className="content-wrapper transition-all duration-150 xl:ltr:ml-[248px] xl:rtl:mr-[248px]" id="content_wrapper">
      <div className="page-content bg-blue-50">
        <div id="content_layout">
          {/* <!-- BEGIN: Breadcrumb --> */}
          <div className="mb-5" >
            <ul className="m-0 p-0 list-none">
              
              

            </ul>
          </div>
          {/* <!-- END: BreadCrumb --> */}
          <div className="space-y-5" style={{marginTop:'-30px'}}>
            <div className="grid grid-cols-1">
              <div className="card">
                <div className="card-body flex flex-col p-6">
                  <header className="flex mb-5 items-center border-b border-slate-100 dark:border-slate-700 pb-5 -mx-6 px-6">
                    <div className="flex-1">
                      <div className="card-title text-slate-900 dark:text-white" style={{color:'black', marginBottom:'-100px'}}>
                        Manage FAQ <iconify-icon icon="heroicons:exclamation-triangle" style={{ display: 'inline-block', marginLeft: '5px' }}></iconify-icon>
                      </div>
                    </div>
                  </header>
                  <div className="card-text h-full" >
                    <div className="active" style={{marginTop:'-30px'}}>
                    <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4 menu-open" id="tabs-tab" role="tablist">
  <li className="nav-item" role="presentation">
    <a href="#exam" className="nav-link w-full block font-medium text-sm font-Inter leading-tight capitalize border-x-0 border-t-0 border-b border-transparent px-4 pb-2 my-2 hover:border-transparent focus:border-transparent dark:text-slate-300 active" id="exam-tab" data-bs-toggle="pill" data-bs-target="#exam" role="tab" aria-controls="exam" aria-selected="true">
      Exam
    </a>
  </li>
  <li className="nav-item" role="presentation">
    <a href="#course" className="nav-link w-full block font-medium text-sm font-Inter leading-tight capitalize border-x-0 border-t-0 border-b border-transparent px-4 pb-2 my-2 hover:border-transparent focus:border-transparent dark:text-slate-300 " id="course-tab" data-bs-toggle="pill" data-bs-target="#course" role="tab" aria-controls="course" aria-selected="false">
      Course
    </a>
  </li>
  <li className="nav-item" role="presentation">
    <a href="#college" className="nav-link w-full block font-medium text-sm font-Inter leading-tight capitalize border-x-0 border-t-0 border-b border-transparent px-4 pb-2 my-2 hover:border-transparent focus:border-transparent dark:text-slate-300 " id="college-tab" data-bs-toggle="pill" data-bs-target="#college" role="tab" aria-controls="college" aria-selected="false">
      College
    </a>
  </li>
  <li className="nav-item" role="presentation">
    <a href="#university" className="nav-link w-full block font-medium text-sm font-Inter leading-tight capitalize border-x-0 border-t-0 border-b border-transparent px-4 pb-2 my-2 hover:border-transparent focus:border-transparent dark:text-slate-300 " id="university-tab" data-bs-toggle="pill" data-bs-target="#university" role="tab" aria-controls="university" aria-selected="false">
      University
    </a>
  </li>
  <li className="nav-item" role="presentation">
    <a href="#institute" className="nav-link w-full block font-medium text-sm font-Inter leading-tight capitalize border-x-0 border-t-0 border-b border-transparent px-4 pb-2 my-2 hover:border-transparent focus:border-transparent dark:text-slate-300 " id="institute-tab" data-bs-toggle="pill" data-bs-target="#institute" role="tab" aria-controls="institute" aria-selected="false">
      Institute
    </a>
  </li>
  <li className="nav-item" role="presentation">
    <a href="#hospital" className="nav-link w-full block font-medium text-sm font-Inter leading-tight capitalize border-x-0 border-t-0 border-b border-transparent px-4 pb-2 my-2 hover:border-transparent focus:border-transparent dark:text-slate-300 " id="hospital-tab" data-bs-toggle="pill" data-bs-target="#hospital" role="tab" aria-controls="hospital" aria-selected="false">
      Hospital
    </a>
  </li>
  <li className="nav-item" role="presentation">
    <a href="#clinic" className="nav-link w-full block font-medium text-sm font-Inter leading-tight capitalize border-x-0 border-t-0 border-b border-transparent px-4 pb-2 my-2 hover:border-transparent focus:border-transparent dark:text-slate-300 " id="clinic-tab" data-bs-toggle="pill" data-bs-target="#clinic" role="tab" aria-controls="clinic" aria-selected="false">
      Clinic
    </a>
  </li>
  <li className="nav-item" role="presentation">
    <a href="#certificate-course" className="nav-link w-full block font-medium text-sm font-Inter leading-tight capitalize border-x-0 border-t-0 border-b border-transparent px-4 pb-2 my-2 hover:border-transparent focus:border-transparent dark:text-slate-300 " id="certificate-course-tab" data-bs-toggle="pill" data-bs-target="#certificate-course" role="tab" aria-controls="certificate-course" aria-selected="false">
      Certificate Courses
    </a>
  </li>
</ul>

                      <div className="tab-content" id="tabs-tabContent">
                        
                      <div className={`tab-pane fade ${activeTab === 'exam' ? 'show active' : ''}`} id="exam" role="tabpanel" aria-labelledby="exam-tab">
                        <ExamFAQPage/>
                        </div>

                      <div className={`tab-pane fade ${activeTab === 'course' ? 'show active' : ''}`} id="course" role="tabpanel" aria-labelledby="course-tab">
                            {/* <ArticleCourse/> */}
                        </div>

                        <div className={`tab-pane fade ${activeTab === 'college' ? 'show active' : ''}`} id="college" role="tabpanel" aria-labelledby="college-tab">
                           {/* <ArticleCollege/> */}
                        </div>

                        <div className={`tab-pane fade ${activeTab === 'university' ? 'show active' : ''}`} id="university" role="tabpanel" aria-labelledby="university-tab">
                            {/* <ArticleUniversity/> */}
                        </div>

                        <div className={`tab-pane fade ${activeTab === 'institute' ? 'show active' : ''}`} id="institute" role="tabpanel" aria-labelledby="institute-tab">
                            {/* <ArticleInstitute/> */}
                        </div>

                        <div className={`tab-pane fade ${activeTab === 'hospital' ? 'show active' : ''}`} id="hospital" role="tabpanel" aria-labelledby="hospital-tab">
                            {/* <ArticleHospital/> */}
                        </div>

                        <div className={`tab-pane fade ${activeTab === 'clinic' ? 'show active' : ''}`} id="clinic" role="tabpanel" aria-labelledby="clinic-tab">
                            {/* <ArticleClinic/> */}
                        </div>

                        <div className={`tab-pane fade ${activeTab === 'certificate-course' ? 'show active' : ''}`} id="certificate-course" role="tabpanel" aria-labelledby="certificate-course-tab">
                            {/* <ArticleStaticPages/> */}
                        </div>

                        

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default FAQMainPage
