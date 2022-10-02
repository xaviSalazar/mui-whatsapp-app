import { useState, useEffect } from "react"

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useSelector } from "react-redux";
import { httpManager } from "../../conection-manager/httpManager"
import { LoadFiles } from "../LoadFiles";
import reactStringReplace from 'react-string-replace';
import './SelectTemplate.css'



const buildBusinessPayload = (payload, initConvTemplate, setInitConvTemplate) => {
    const variable = {...initConvTemplate}
    //console.log(variable)
    variable['template']['language']['code'] = payload.language                
    variable['template']['name'] = payload.name
    const componentes = []
    function buildComponents(item, index, arr) {
        if(item.type === 'HEADER') {
            if (item.format === 'DOCUMENT' ||
                    item.format === 'IMAGE' ||
                    item.format === 'VIDEO') {
                        const type_doc = item.format.toLowerCase();
                        const header = {type: item.type.toLowerCase(),}
                        const parameters = []
                        const listing_parameters = {type: item.format.toLowerCase(),}
                        listing_parameters[type_doc] = {link: ""}
                        parameters.push(listing_parameters)
                        header['parameters'] = parameters
                        componentes.push(header);
                    } 
                    //      else if (item.format === 'TEXT') {
                    //     const type_doc = item.format.toLowerCase();
                    //     const header = {type: item.type.toLowerCase(),}
                    //     const parameters = []
                    //     const listing_parameters ={type: item.format.toLowerCase(),}
                    //     listing_parameters[type_doc] = item.text
                    //     parameters.push(listing_parameters)
                    //     header['parameters'] = parameters
                    //     componentes.push(header);
                    // }
        } else if(item.type === 'BODY') {
            // verify if i need to send variables
            let regVar = /{{(\d+)}}/g
            if(regVar.test(item.text)) {
            const body = {type: item.type.toLowerCase(),}
            const parameters = []
            const listing_parameters = {type: "text", text: item.text}
            parameters.push(listing_parameters)
            body['parameters'] = parameters
            componentes.push(body);
            }
        } else if(item.type === 'BUTTONS') {

        }
    }
    variable['template']['components'] = componentes
    payload.components.forEach(buildComponents)
    //console.log(variable)
    setInitConvTemplate(variable)
}


const SelectTemplate = ({initConvTemplate, setInitConvTemplate}) => {

    const [templates, setTemplates] = useState()
    let auth = useSelector(state => state.customerReducer.auth)
    const [option, setOption] = useState('');
    const [example, setExample] = useState()
    const [detailTemplate, setDetailTemplate] = useState()
   
    const [newState, setNewState] = useState([]);
    const [file, setFile] = useState()
    const [age, setAge] = useState()


    useEffect( () => {

        const fetchData = async () => {
            const templ = await httpManager.getWhatsappTemplates(auth?.data?.responseData?._id)
            const loaded_templates = templ.data.responseData.data.filter(item => item.status === 'APPROVED').map(item => item)
            setTemplates(loaded_templates)
            console.log(loaded_templates)
        }

        
        fetchData().catch(console.error)

    }, [auth?.data?.responseData?._id])


    const handleChange = (event) => {

        setOption(event.target.value)
        // filter template
        const sel_template = templates.filter(template => template.name === event.target.value)
        let new_selection = sel_template.pop()
        setExample(new_selection)
        setDetailTemplate(new_selection)
        buildBusinessPayload(new_selection, initConvTemplate, setInitConvTemplate);

      };

      const RenderHeader = example && example.components.map(
        (item,index) => {
            if (item.type === 'HEADER') {
                if (item.format === 'DOCUMENT' ||
                    item.format === 'IMAGE' ||
                    item.format === 'VIDEO') {
                    
                    return  <div key = {index} className="_7zeb">
                            <div className="_7r3a _7r39">
                            {file && (
                            <a href={file.link} target="_blank" rel="noreferrer">
                            <img alt="document" src= {file.link}
                            width="200" height="200"/>
                            </a>)}

                            </div>
                        </div>
                } else { return null }
            } else {return null} 
        })

        useEffect(() => {
            // console.log("added file")
            // console.log(file)
            // use lowercase here
            // handling other comp to send
            if(!detailTemplate) {return}
            const example_template = {...detailTemplate} 
            
            const new_example_template = example_template['components'].map(p =>
                p.type==="HEADER"
                ? {...p, example: file.link} : p);
            example_template['components'] = new_example_template
            setDetailTemplate(example_template)
            // console.log(example_template)
    
            const variable = {...initConvTemplate}
            const new_comp = variable['template']['components'].map(p=> 
                p.type === "header" 
                 ? {...p, parameters: [{type: file.format.toLowerCase(), [file.format.toLowerCase()]: {link: file.link}}]} : p );
            variable['template']['components'] = new_comp
            // console.log(variable)
            setInitConvTemplate(variable)
        }, [file])

        const handleArrayInput = (e, i, mapArray) => {
          const {value} = e.target
          // take table from memory
          var table = [...newState]
          table[i] = value
          // save to memory 
          setNewState(table)
          // console.log(table)
          const nueva = table.filter(item => typeof item !== 'undefined').map((item, index) => (
              {type: "text", text:item} 
          ))
          // hold latest value 
          mapArray[i] = value
          // copy elements
          const variable = mapArray.map((item, index) => (
              typeof item === 'object' ? table[index] : item
          ))
  
          // join all words into single text
          let text_joined = variable.join("")
          const example_template = {...detailTemplate} 
          const new_example_template = example_template['components'].map(p =>
              p.type==="BODY"
              ? {...p, text: text_joined} : p);
          example_template['components'] = new_example_template
          // console.log(example_template)
          setDetailTemplate(example_template)
          // setExample(example_template)
  
          const older_template = {...initConvTemplate}
          const new_comp = older_template['template']['components'].map(p=> 
              p.type === "body" 
               ? {...p, parameters: nueva} : p );
          older_template['template']['components'] = new_comp
          setInitConvTemplate(older_template)
      }

      const handleSelect = (e, i, mapArray) => {
        setAge(e.target.value)
        var table = [...newState]
        table[i] = e.target.value
        setNewState(table)
        const nueva = table.filter(item => typeof item !== 'undefined').map((item, index) => (
            {type: "text", text:item} 
        ))
        // hold latest value 
        mapArray[i] = e.target.value
        // copy elements
        const variable = mapArray.map((item, index) => (
            typeof item === 'object' ? table[index] : item
        ))

        // join all words into single text
        let text_joined = variable.join("")
        const example_template = {...detailTemplate} 
        const new_example_template = example_template['components'].map(p =>
            p.type==="BODY"
            ? {...p, text: text_joined} : p);
        example_template['components'] = new_example_template
        // console.log(example_template)
        setDetailTemplate(example_template)
        // setExample(example_template)

        const older_template = {...initConvTemplate}
        const new_comp = older_template['template']['components'].map(p=> 
            p.type === "body" 
             ? {...p, parameters: nueva} : p );
        older_template['template']['components'] = new_comp
        setInitConvTemplate(older_template)
    }
    
      const EditParametersTemplate = example && example.components.map(
        (item,index) => {

            if (item.type === 'HEADER') {
                if (item.format === 'DOCUMENT' ||
                    item.format === 'IMAGE' ||
                    item.format === 'VIDEO') {
                    return <label key={index}>{`Cargar archivo tipo ${item.format}: `} <LoadFiles setFile = {setFile} format={item.format.toLowerCase()}/> </label>
                } else { return null }
            }

            if (item.type === 'BODY') {
                 const mapArray = reactStringReplace(item.text,/{{(\d+)}}/g, (match, i) => {
                      return <div key={i}><input type="text" value={newState[i] || ""} onChange={(e) => handleArrayInput(e, i, mapArray)}/> 
                            <Select
                            defaultValue = ""
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age || ""}
                            label="Age"
                            onChange={e => handleSelect(e, i, mapArray)}
                            >
                            <MenuItem value={"__name__"}>Nombre</MenuItem>
                            <MenuItem value={"__address__"}>Direccion</MenuItem>
                            <MenuItem value={"__email__"}>Email</MenuItem>
                            </Select> 
                            </div>
                 })
                 return <div key="arrayEdit"> {mapArray} </div>;
            }
            return null
        }
)



const RenderBody = detailTemplate && detailTemplate.components.map(
        (item, index) => {  
            if (item.type === 'BODY') {
                if (item.text) {
                    return <div key={index} className="6xdv">
                                <span className="6xe4">
                                    {item.text}
                                </span>
                           </div>
                } else { return null }
            } else {return null}
        })

const RenderFooter = example && example.components.map(
        (item,index) => {
            if (item.type === 'FOOTER')
            {
                if(item.text) {
                    return <div key={index} className="_7qiw" dir="auto">
                                {item.text}
                             </div>
                } else {return null}

            } else {return null}
        })

const RenderButtons = example && example.components.map(
        (item, indice) => {
            if(item.type === 'BUTTONS')
            {
                if(item.buttons){
                    return  <div key={indice} className="buttons_type">
                                    {
                                    item.buttons.map((item,index) => {
                                     return <div key={index} className="internal__button">
                                            <span>{item.text}</span>
                                             </div>
                                    })
                                    }
                                    </div>
                } else {return null}
            } else {return null}
        })

      return (
        <Box sx={{ minWidth: 120 }}>

          <FormControl sx={{ m: 4, width: 300 }}>
            <InputLabel id="demo-simple-select-label">Whatsapp Business Template</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={option}
              label="Age"
              onChange={handleChange}
            >
                {templates?.map((template, index) =>  <MenuItem key={index} value={template.name}>{template.name}</MenuItem>)}
            </Select>
          </FormControl>
        {option && (
          <div className="external">
                         <div className='chat__preview'>
                             <div className="_6xe3">
                                 <div className="_70ru">
                                     {RenderHeader}
                                     {RenderBody}
                                     {RenderFooter}
                                 </div> 
                             </div>           
                                 {RenderButtons}
                         </div>
                         <div className="template__edit">{EditParametersTemplate}</div>
          </div>
        )}

        </Box>
      );


}

export default SelectTemplate