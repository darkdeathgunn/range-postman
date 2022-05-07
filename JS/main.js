console.log("The postman clone file");

let addingParamsCount=2;


let jsonTextDiv=document.getElementById("jsonTextDiv");
let customInputDiv=document.getElementById("customInputDiv");
let submitButton=document.getElementById("submitButton");
let responseDiv=document.getElementById("responseDiv");


// switching between json and coustom input box 
customInputDiv.style.display="none";
inputCustom.addEventListener("click",() =>{
    jsonTextDiv.style.display="none";
    customInputDiv.style.display="block";
    let inputJsonText=document.getElementById("inputJsonText").value="";
});
inputJson.addEventListener("click",() =>{
    jsonTextDiv.style.display="block";
    customInputDiv.style.display="none";
    addingParamsCount=2;
    delete_param();
});

// inserting new parameters boxes 
let addParam=document.getElementById("addParam");
addParam.addEventListener("click",()=>{
    let newParams=document.getElementById("newParams");
    let str=`<div class="form-row my-2" style=" overflow:hidden;">
                <label for="custom" class="col-sm-2 col-form-label" style="float:left;">Parameter ${addingParamsCount}</label>
                <div class="col-md-4 mx-3" style="float:left;">
                    <input type="text" class="form-control" id="parameterKey${addingParamsCount}" placeholder="Enter Parameter ${addingParamsCount} Key">
                </div>
                <div class="col-md-4 mx-2" style="float:left;">
                    <input type="text" class="form-control" id="parameterValue${addingParamsCount}" placeholder="Enter Parameter ${addingParamsCount} Value">
                </div>
                <button onclick="delete_param()" class="btn btn-primary mx-1" style="float:left;">-</button>
            </div>`;
    addingParamsCount++;
    newParams.innerHTML+=str;
});

// deleting parameter boxes
function delete_param(){
    addingParamsCount--;
    let str="";
    for(let x=2;x<addingParamsCount;x++){
        str+=`<div class="form-row my-2" style=" overflow:hidden;">
                <label for="custom" class="col-sm-2 col-form-label" style="float:left;">Parameter ${x}</label>
                <div class="col-md-4 mx-3" style="float:left;">
                    <input type="text" class="form-control" id="parameter${x}Key" placeholder="Enter Parameter ${x} Key">
                </div>
                <div class="col-md-4 mx-2" style="float:left;">
                    <input type="text" class="form-control" id="parameter${x}Value" placeholder="Enter Parameter ${x} Value">
                </div>
                <button onclick="delete_param()" class="btn btn-primary mx-1" style="float:left;">-</button>
            </div>`;
    }
    let newParams=document.getElementById("newParams");
    newParams.innerHTML=str;
}

// on submit 
submitButton.addEventListener("click",()=>{
    let responseText=document.getElementById("responseText");
    responseText.value="Please Wait.....Fetching....";
    let inputUrl=document.getElementById("inputUrl").value;
    let requestTypeDiv = document.querySelector("input[name='requestType']:checked").value;
    let contentTypeDiv = document.querySelector("input[name='contentType']:checked").value;
    // console.log(inputUrl,requestTypeDiv,contentTypeDiv);
    let data={};
    if(contentTypeDiv==="JSON"){
        let inputJsonText=document.getElementById("inputJsonText").value;
        data=inputJsonText;
        //{"name":"test","salary":"123","age":"23"}
    }
    else{
        for(let x=1;x<addingParamsCount;x++){
            let key=document.getElementById("parameterKey"+x).value;
            let value=document.getElementById("parameterValue"+x).value;
            if(key!=""){
                data[key]=value;
            }
        }
        data=JSON.stringify(data);
    }
    if(requestTypeDiv==="GET"){
        fetch(inputUrl,{
            method:'GET'
        }).then(response=>response.text())
        .then((text)=>{
            responseText.value=text;
        });
    }
    else if(requestTypeDiv==="POST"){
        fetch(inputUrl,{
            method:'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body:data
        }).then(response=>response.text())
        .then((text)=>{
            responseText.value=text;
        });
    }
});



