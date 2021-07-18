import "../Styles/Block.css"

const css = {
    h1: {
        color: 'blue',
    }
}

var a;
var b = false;




// function ass(){
//     console.log('jepa');
    
// }

function hashHandler(){
    var oldHash = a.location.hash;
    // var url = (a.location != a.parent.location)
    //         ? document.referrer
    //         : document.location.href;
    var detect = () => {
        if(oldHash!=a.location.hash){
            console.log(a.location.hash);
            oldHash = a.location.hash;
        }
        // a.onhashchange = function() { 
        //         console.log("piska")
        //     }
    };
    setInterval(function(){ detect() }, 100);
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
    a = window.open("https://oauth.vk.com/authorize?client_id=7905028&display=page&redirect_uri=localhost:80&scope=groups&response_type=token&v=5.52","","height=300,width=400");

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