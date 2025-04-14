const btns = document.querySelectorAll('button')

class Candidates{
    partyName;
    candidateName;
    #vote = 0;

    constructor(party,name){
        this.partyName = party;
        this.candidateName = name;
    }

    voteParty(){
        return this.#vote++;
    }

    get vote(){
        return this.#vote;
    }
}

  
const voter1 = new Candidates('Rcb','Malya');
const voter2 = new Candidates('Mi','Ambani');
const voter3 = new Candidates('Csk','Thala');
const voter4 = new Candidates('NOTA','NOTA');

const lead = [voter1,voter2,voter3,voter4];

btns.forEach( (element,index) => {
    element.addEventListener('click',()=>{
        lead[index].voteParty();
        // console.log(lead[index])
    })
});

setInterval(()=>{
    let a = [];
    for(let i = 0 ; i < lead.length ; i++){
        a.push(lead[i].vote);
    }
    let maximum = Math.max(...a);
    if(maximum === 0){
        return maximum = NaN;
    }
    let position = a.indexOf(maximum);
    if(position == undefined){
        console.log('Vote someone');
    }
    else{
        alert(lead[position].partyName+' leading with '+lead[position].vote);
    }
},5000)
