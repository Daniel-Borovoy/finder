import React from 'react'
const myHeaders = new Headers()
myHeaders.append('Access-Control-Allow-Origin','*')
myHeaders.append('Content-Type', 'text/plain')
export const AudioList = () => {
    let list
    let config = {
        method: 'GET',
        headers: {
            "Origin": "http://localhost:3000"
        },
        mode: 'cors'}
    async function getAudioList () {
        const corsAnywhere = 'https://cors-anywhere.herokuapp.com/'
        const userId = '265521593'
        const accessTokenFromVKAdmin = '42c8383f431aa4a7373a3d999b892d83d8b5b7aa1b6e952dc19e3e322e665d57d5e93923d331b705b559a'
        const vkAudioMethod = `https://api.vk.com/method/audio.get?owner_id=${userId}&access_token=${accessTokenFromVKAdmin}&v=5.131`
        const request = corsAnywhere + vkAudioMethod
        const data = await fetch(request, config)
        const audioList = await data.json()
        console.log(audioList)
        for (let i = 0; i < 200; i++) {
            console.log(audioList.response.items[i], i+1)
        }
    }
    // getAudioList()
    // return (<p>{list}</p>)
    return null
}
