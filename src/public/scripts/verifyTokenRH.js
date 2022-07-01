const url = $("#verifyTokenRH_id").attr("urlS");

axios({
    method: "GET",
    url: "/api/auth/t/rh",
    headers: { "x-access-token": localStorage.getItem("auth") },
})
    .then(res => console.log(res))
    .catch((err) => {
        console.log(err.response.data);
        window.location.href = `${url}/api/auth/singin-page`;
    })