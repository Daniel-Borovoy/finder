import "../Styles/Block.css"

const css = {
    h1: {
        color: 'blue',
    }
}

let a;
let b = false;




// function ass(){
//     console.log('jepa');

// }
let userHash;
let token;
let userId;
const hashHandler = () => {
    let oldHash = a.location.hash;
    const detect = () => {
        if (oldHash !== a.location.hash){
            if (a.location.hash.startsWith("#access_token")){
                userHash = a.location.hash;
                a.close()
                clearInterval(interval);
                return;   
            }
            return;
        }
        return;
    }
    let interval = setInterval(() => {
        detect();
    }, 100);
    setTimeout(() => {
        let searchParams = new URLSearchParams(userHash);
        token = searchParams.get("#access_token");
        userId = searchParams.get("user_id");
        // console.log(userHash)
        // let response = fetch(`https://api.vk.com/method/users.get?user_ids=${userId}&fields=bdate&access_token=${token}&v=5.131`, "no-cors");
        // хз почему fetch не работает, почитай про Response() js и проблему с этой ошибкой в реакте
    }, 3000);
    
}






// var hashDetection = new hashHandler();



function click(){
    b = true;
    // document.location.href = "https://oauth.vk.com/authorize?client_id=7905028&display=page&redirect_uri=localhost:80&scope=groups&response_type=token&v=5.52";
    // let paramsString = document.location.href,
    //     searchParams = new URLSearchParams(paramsString);
    // console.log(searchParams.get("http://localhost/#access_token"));
    // let token = searchParams.get("http://localhost/#access_token");
    
    // if (token === null){
    //     alert("Вы не авторизованы");
    // }else{
    //     alert("Вы авторизованы");
    // }
    a = window.open("https://oauth.vk.com/authorize?client_id=7905028&display=page&redirect_uri=localhost:80&scope=groups&response_type=token&v=5.52","","height=300,width=400", "");

    // console.log(a.location.href);
    // a.onhashchange = function() { 
    //     console.log("piska")
    //     console.log('a');
    // }
    hashHandler();
    
}

function tested(){
    b = true;
}

function Block() {
  return (
    <div className='test'>
     <h1>Test</h1>
        <form action=''>
            <input type='button' onClick={click}  value='Тык'></input>
            <input type='button' onClick={tested}  value='Бяк'></input>
            {/* <a href='https://oauth.vk.com/authorize?client_id=7905028&display=page&redirect_uri=localhost:80&scope=groups&response_type=token&v=5.52'>123</a> */}
        </form>
    </div>
  );
}

export default Block;