const FetchGET = () => {
    
}

const FetchPOST= (body, routeName) => {
    response = fetch(`http://localhost:5000/${routeName}`, {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(body)
})
    parseRes = response.json()
}

module.exports = {
    FetchPOST
}