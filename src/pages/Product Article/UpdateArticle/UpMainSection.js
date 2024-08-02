import React, {useState, createRef, useEffect} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';



function UpMainSection() {

  const[longdesc, setLongDesc]=useState('');
  const[authname, setAuthName]=useState('');
  const[breadt, setBreadt]=useState('');
  const[paget, setPaget]=useState('');
  const[metat, setMetat]=useState('');
  const[metadesc, setMetadesc]=useState('');
  const[metakey, setMetakey]=useState('');
  const[ogt, setOgt]=useState('');
  const[ogdesc, setOgdesc]=useState('');
  const[time, setTime]=useState('')
  const[file, setFile]=useState('');
  const[ogrobot, setOgrobot]=useState('');
  const[oggogle, setOggogle]=useState('');
  const[notifications, setNotifications] = useState([]);
  const[url, setUrl]=useState('')
  const[ppage, setPpage]=useState('')
  const[ptype,setPtype]=useState('')
  const[ploc, setPloc]=useState('')
  const[pall, setPall]=useState('')
  const[loading, setLoading]=useState(false)

  const {id}=useParams();

  const htmlToText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const handleEditorChange = (content) => {
    // Convert HTML content to plain text
    const plainText = htmlToText(content);
    // Set the plain text to the state variable
    setLongDesc(plainText);
  };

  const addNotification = () => {
    
    setNotifications([...notifications,{ date: '', text: '', link: '' }]);
  };
  const deleteNotification = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  const fileinput = createRef();

  const toastii = ()=>{
    toast("Article Saved Successfully");
  }
  const toastiyy = ()=>{
    toast("Article Drafted Submitted");
  }

  const submitoverview=async(e)=>{
    e.preventDefault();

      try {
        


        const formData = new FormData();
        formData.append('ptype',ptype)
        formData.append('ppage',ppage)
        formData.append('ploc',ploc)
        formData.append('pall',pall)
        formData.append('url',url)
        formData.append('file',file);
        formData.append('longdesc', longdesc);
        formData.append('authname', authname);
        formData.append('breadt', breadt);
        formData.append('paget', paget);
        formData.append('metat', metat);
        formData.append('metadesc', metadesc);
        formData.append('metakey', metakey);
        formData.append('ogt', ogt);
        formData.append('ogdesc', ogdesc);
        formData.append('ogrobot', ogrobot);
        formData.append('oggogle', oggogle);
        formData.append('time',time)
        formData.append('status',true)

        const generateUniqueId = () => {
          const min = 100;
          const max = 999;
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        
        const uniqueId = generateUniqueId();
        
        formData.append('id',uniqueId)
        
        

        notifications.forEach((notification, index) => {
            formData.append(`notifications[${index}][date]`, notification.date);
            formData.append(`notifications[${index}][text]`, notification.text);
            formData.append(`notifications[${index}][link]`, notification.link);
            console.log('Notification:', notification);
          });

        
        const result = await axios.put( `http://localhost:4000/api/UpdateArticle/${id}`, formData)
        const overviewdata = await result.data();
        toastii();
        console.log('Success:', overviewdata);
        // onSubmitt();
        
      } catch (error) {
        console.error('Error:', error);
      }

  }

  const saveAsDraft=async(e)=>{
    
    e.preventDefault();

    try {
      
      
      
      

      const formData = new FormData();
      formData.append('ptype',ptype)
      formData.append('ppage',ppage)
      formData.append('ploc',ploc)
      formData.append('pall',pall)
      formData.append('url',url)
      formData.append('file',file);
      formData.append('longdesc', longdesc);
      formData.append('authname', authname);
      formData.append('breadt', breadt);
      formData.append('paget', paget);
      formData.append('metat', metat);
      formData.append('metadesc', metadesc);
      formData.append('metakey', metakey);
      formData.append('ogt', ogt);
      formData.append('ogdesc', ogdesc);
      formData.append('ogrobot', ogrobot);
      formData.append('oggogle', oggogle);
      formData.append('time',time)
      formData.append('status',false)
      
      const generateUniqueId = () => {
        const min = 100;
        const max = 999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      const uniqueId = generateUniqueId();
        
        formData.append('id',uniqueId)


      notifications.forEach((notification, index) => {
          formData.append(`notifications[${index}][date]`, notification.date);
          formData.append(`notifications[${index}][text]`, notification.text);
          formData.append(`notifications[${index}][link]`, notification.link);
          console.log('Notification:', notification);
        });

        

      
      const result = await axios.put( `http://localhost:4000/api/UpdateArticle/${id}`, formData)
      const overviewdata = await result.data();
      toastiyy();
      console.log('Success:', overviewdata);
      
    } catch (error) {
      console.error('Error:', error);
    }

  }

  const options = [
    { value: 'Exams', label: 'Exams' },
    { value: 'Courses', label: 'Courses' },
    { value: 'News', label: 'News' },
    { value: 'Colleges', label: 'Colleges' },
    { value: 'Hospitals', label: 'Hospitals' },
    { value: 'Community', label: 'Community' },
    { value: 'Reset Password', label: 'Rest Password'},
    { value: 'Register', label: 'Register'},
    { value: 'Login', label: 'Login'},
    { value: 'Terms And Conditions', label: 'Terms And Conditions'},
    { value: 'Privacy Policy', label: 'Privacy Policy'},
    { value: 'Contact', label: 'Contact'},
    { value: 'Carrer', label: 'Carrer'},
    { value: 'About', label: 'About'},
    { value: 'Home', label: 'Home'},
    { value: 'Author', label: 'Author'},
    { value: 'Institutes', label: 'Institutes'},
    { value: 'Clinic', label: 'Clinic'},
    { value: 'Profile', label: 'Profile'},
    { value: 'Universities', label: 'Universities'},
]



const optionss = [
  { value: 'Main Listing Page', label: 'Main Listing Page' },
  { value: 'Paramedical', label: 'Paramedical' },
  { value: 'Medical', label: 'Medical' },
  { value: 'Pharmacy', label: 'Pharmacy' },
  { value: 'Dental', label: 'Dental' },
  { value: 'Science', label: 'Science' },
  { value: 'Veterinary', label: 'Veterinary' },
  { value: 'Ayurveda', label: 'Ayurveda' }
];

const[mapcourses, setMapCourses]=useState([])

useEffect(() => {
  const fetchCourses = async () => {
      try {
          const response = await axios.get('http://localhost:4000/api/getallcourses');
          setMapCourses(response.data.courses); 
      } catch (error) {
          console.error('Error fetching courses:', error);
      }
  };

  fetchCourses();
}, []);

const optionsmap = [
  ...mapcourses.map((courses) => ({ value: courses, label: courses }))
];
const optionsall = [...optionss, ...optionsmap];

const[allstates, setAllstates]=useState([])

useEffect(()=>{
  const fetchstates= async()=>{
    try {
      const response = await axios.get('http://localhost:4000/api/getallstates')
      setAllstates(response.data.allstates)
      // console.log('States',response.data.allstates)
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  }
  fetchstates();
},[])

const optionsstate=[
  ...allstates.map((statename)=>({value:statename, label:statename}))
]
const[visible, setVisible]=useState(false)

useEffect(() => {
  if (ptype === "Colleges" || ptype === "Hospitals") {
      setVisible(true);
  } else {
      setVisible(false);
  }
}, [ptype]); 

useEffect(() => {
  const title = `https://medicaljagat.com/${ptype}/${ppage}/${ploc}/${pall}`;
  setUrl(title);
}, [ptype, ppage, ploc, pall]);



useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        console.log("Inside fetchExamDetails")
        console.log(id)
        const response = await fetch(`http://localhost:4000/api/getarticledetailsbyid/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Exam Details:', data);
          
          setPtype(data.ptype || ''); // Add additional checks for undefined values
          setPall(data.pall || '');
          setPloc(data.ploc || '');
          setPpage(data.ppage || '');
          console.log(ppage)
          setUrl(data.url)
          setLongDesc(data.longdesc)
          setTime(data.time)
          setAuthName(data.authname)
          setBreadt(data.breadt)
          setPaget(data.paget)
          setMetat(data.metat)
          setMetadesc(data.metadesc)
          setMetakey(data.metakey)
          setOgt(data.ogt)
          setOgdesc(data.ogdesc)
          setOgrobot(data.ogrobot)
          setOggogle(data.oggogle)
          setNotifications(data.notifications)


        } else {
          console.error('Error fetching exam details:', response.statusText);
        }
      } catch (error) {
        console.error('Error in Fetching Exam Details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [id]);


  return (
    <div>
      <form className="space-y-4" onSubmit={submitoverview}>
      <ToastContainer />

                          <div className="">

                          
                         <label htmlFor="select" className="form-label mt-2">{url}<span style={{ color: 'red' }}>*</span></label>



                            <div className="input-area relative"  >
                               <label for="Input" className="form-label" >Long Description<span style={{ color: 'red' }}>*</span></label>
                               <Editor textareaName='content' initialValue={longdesc} onEditorChange={handleEditorChange}
                               init={{
                                height: 500,
                                menubar: true,
                                plugins: 'advlist autolink lists link image charmap preview anchor ' +
                                  'searchreplace visualblocks code fullscreen ' +
                                  'insertdatetime media table code help wordcount'
                                ,
                                toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                              }}
                              required />
                            </div>
                            <div className="flex items-center" style={{marginTop:'10px'}}  >
                               <label for="Input" className="form-label flex">Reading Time<span style={{ color: 'red' }}>*</span></label>
                                 <input type="text" className="form-control" style={{width:'500px', marginLeft:'-1000px'}} value={time} onChange={(e)=>setTime(e.target.value)} required/>
                            </div>

                            <div className="flex items-center" style={{marginTop:'10px'}}  >
                               <label for="Input" className="form-label flex">Author Name<span style={{ color: 'red' }}>*</span></label>
                                 <input type="text" className="form-control" style={{width:'500px', marginLeft:'-1000px'}} value={authname} onChange={(e)=>setAuthName(e.target.value)}/>
                               <button className="btn inline-flex justify-center btn-outline ml-3 bg-green-400 ml-10" type='button' onClick={addNotification}>Add Notification</button>
                            </div>
                            {notifications.map((notification, index) => (
                             <div key={index} className="flex items-center" style={{ marginTop: '10px' }}>
                               <label htmlFor={`notification-${index}`} className="form-label flex">Added Notification {index + 1}:</label>
                                 <input
                                 type="date" id={`date-notification-${index}`} className="date-control" style={{ width: '500px', marginLeft: '-450px', fontSize:'12px'  }} placeholder='dd-mm-yyyy' value={notification.date} onChange={(e) => {const updatedNotifications = [...notifications]; 
                                 updatedNotifications[index] = {...notification, date:e.target.value};  setNotifications(updatedNotifications); }} />
                                 <input
                                 type="text" id={`text-notification-${index}`} className="text-control" style={{ width: '500px', marginLeft: '10px', fontSize:'12px' }} placeholder='Notification Text' value={notification.text} onChange={(e) => {const updatedNotifications = [...notifications]; 
                                 updatedNotifications[index] = {...notification, text:e.target.value};  setNotifications(updatedNotifications); }} />
                                 <input
                                 type="link" id={`link-notification-${index}`} className="link-control" style={{ width: '500px', marginLeft: '10px', fontSize:'12px' }} placeholder='Notification Link' value={notification.link} onChange={(e) => {const updatedNotifications = [...notifications]; 
                                 updatedNotifications[index] = {...notification, link:e.target.value};  setNotifications(updatedNotifications); }} />
                                 <button className="btn inline-flex justify-center ml-3 bg-red-400" style={{ fontSize: '12px', padding: '4px 6px' }} type='button' onClick={() => deleteNotification(index)}>Delete</button>
                             </div>
                           ))}
                           
                             
                            <label for="Input" className="form-label mt-3" style={{ fontSize: '25px', color:'Grey' }}>SEO TAGS</label>
                        
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7">
                              <div className="input-area relative">
                                    <label for="largeInput" className="form-label">BreadCrum Title<span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" className="form-control" value={breadt} onChange={(e)=>setBreadt(e.target.value)} required/>
                              </div>

                              <div className="input-area relative">
                                    <label for="largeInput" className="form-label">Page Title<span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" className="form-control" value={paget} onChange={(e)=>setPaget(e.target.value)} required/>
                              </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-7">
                              <div className="input-area relative">
                                    <label for="largeInput" className="form-label">Meta Title<span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" className="form-control" value={metat} onChange={(e)=>setMetat(e.target.value)} required/>
                              </div>

                              <div className="input-area relative">
                                    <label for="largeInput" className="form-label">Meta Description</label>
                                    <input type="text" className="form-control" value={metadesc} onChange={(e)=>setMetadesc(e.target.value)}/>
                              </div>

                              <div className="input-area relative">
                                    <label for="largeInput" className="form-label">Meta Keyword</label>
                                    <input type="text" className="form-control" value={metakey} onChange={(e)=>setMetakey(e.target.value)}/>
                              </div>

                              <div className="input-area relative">
                                    <label for="largeInput" className="form-label">OG: Title</label>
                                    <input type="text" className="form-control" value={ogt} onChange={(e)=>setOgt(e.target.value)}/>
                              </div>

                              <div className="input-area relative">
                                    <label for="largeInput" className="form-label">OG: Description</label>
                                    <input type="text" className="form-control" value={ogdesc} onChange={(e) => setOgdesc(e.target.value)} />
                              </div>

                              <div className="form-group mt-2">
                                    <label htmlFor="exampleFormControlFile1">OG: Image</label>
                                    <input type="file" className="form-control-file" id="exampleFormControlFile12" accept='.jpg, .jpeg, .png' ref={fileinput} onChange={(e)=>setFile(e.target.files[0])}/>
                              </div>

                              <div className='mt-2'>
                                <label htmlFor="status" className="form-label items-center">OG: Robots</label>
                                   <div className="input-area relative flex">
                                       <div className="flex space-x-4 items-center mb-3">
                                           <input type="radio" id="NationalExam" name="case1" value="Follow" onChange={(e)=>setOgrobot(e.target.value)} checked={ogrobot=== 'Follow'}/>
                                           <label htmlFor="NationalExam" className="text-sm ml-1">Follow</label>
                                     </div>
                                       <div className="flex space-x-4 items-center mb-3 ml-5">
                                          <input type="radio" id="StateExam" name="examType" value="No Follow" onChange={(e)=>setOgrobot(e.target.value)} checked={ogrobot=== 'NO Follow'}/>
                                           <label htmlFor="StateExam" className="text-sm ml-1">NO Follow</label>
                                      </div>
                                   </div>
                              </div>

                              <div>
                                <label htmlFor="status" className="form-label items-center">OG: googlebot</label>
                                   <div className="input-area relative flex">
                                       <div className="flex space-x-4 items-center mb-3">
                                           <input type="radio" id="NationalExam" name="case2" value="Follow" onChange={(e)=>setOggogle(e.target.value)} checked={oggogle=== 'Follow'}/>
                                           <label htmlFor="NationalExam" className="text-sm ml-1">Follow</label>
                                       </div>
                                       <div className="flex space-x-4 items-center mb-3 ml-5">
                                          <input type="radio" id="StateExam" name="examType" value="No Follow" onChange={(e)=>setOggogle(e.target.value)} checked={oggogle=== 'NO Follow'}/>
                                           <label htmlFor="StateExam" className="text-sm ml-1">NO Follow</label>
                                      </div>
                                   </div>
                              </div>
                              </div>
                          </div>
                              <button className="btn inline-flex justify-center btn-outline-dark" type='button' onClick={saveAsDraft}>Save As Draft</button>
                              <button className="btn inline-flex justify-center btn-outline-dark ml-3 bg-green-400" type='submit'>Make Exam Live</button>
                          </form>
    </div>
  )
}

export default UpMainSection
