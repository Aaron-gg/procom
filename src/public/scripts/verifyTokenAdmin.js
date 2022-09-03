const url = $("#verifyTokenAdmin_id").attr("urlS");

axios({
    method: "GET",
    url: "/api/auth/t/admin",
    headers: { "x-access-token": localStorage.getItem("auth") },
})
    .then(res => {
        console.log(res);
        $('#alert').hide();
    })
    .catch((err) => {
        console.log(err.response.data.mesage);
        alert(JSON.stringify(err.response.data.message));
        window.location.href = `${url}/api/auth/singin-page`;
    })