import "../Styles/Block.css"

const css = {
    h1: {
        color: 'blue',
    }
}

function click(){
    let paramsString = document.location.href,
        searchParams = new URLSearchParams(paramsString);
    console.log(searchParams.get("http://localhost/#access_token"));
    let token = searchParams.get("http://localhost/#access_token");
    
    if (token === null){
        alert("Вы не авторизованы");
    }else{
        alert("Вы авторизованы");
    }
}

function Block() {
  return (
    <div className='test'>
     <h1>Test</h1>
        <form action=''>
            <input type='button' onClick={click}  value='Тык'></input>
            {/* <a href='https://oauth.vk.com/authorize?client_id=7905028&display=page&redirect_uri=localhost:80&scope=groups&response_type=token&v=5.52'>123</a> */}
        </form>
    </div>
  );
}

export default Block;