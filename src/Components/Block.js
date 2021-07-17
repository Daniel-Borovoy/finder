import "../Styles/Block.css"

const css = {
    h1: {
        color: 'blue',
    }
}

function click(){
    let a = window.open('https://oauth.vk.com/authorize?client_id=7905028&display=page&redirect_uri=localhost:80&scope=groups&response_type=token&v=5.52', 'caption', 'resizable=1,width=600,height=600', true);
    let url = a.opener.location.href;
    const params = new URLSearchParams(url);

    let token = params.get("access_token"),
        id = params.get("user_id");

    console.log("access token=" + token + "id=" + id);
}

function Block() {
  return (
    <div className='test'>
     <h1>Test</h1>
        <form action=''>
            <input type='button' onClick={click} value='Тык'></input>
            {/* <a href='https://oauth.vk.com/authorize?client_id=7905028&display=page&redirect_uri=localhost:80&scope=groups&response_type=token&v=5.52'>123</a> */}
        </form>
    </div>
  );
}

export default Block;
