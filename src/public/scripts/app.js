//const url = "http://localhost:3000";
const url = "http://143.198.230.233:3333";

$("#logIn-form").on('submit', (e) => {
    e.preventDefault();

    const username = $("#username_id").val();
    const password = $("#password_id").val();

    axios({
        method: "POST",
        url: "/api/auth/singin",
        data: {
            username,
            password
        },
    })
        .then((res) => {
            localStorage.setItem("auth", res.data.token);
            const userUrl = res.data.url;
            window.location.href = `${url}${userUrl}`;
        })
        .catch(err => console.log(err.response.data))
});

$("#logOut-form").on('submit', (e) => {
    e.preventDefault();

    axios({
        method: "POST",
        url: "/api/auth/logout",
        headers: { "x-access-token": localStorage.getItem("auth") },
    })
        .then((res) => {
            localStorage.removeItem("auth");
            window.location.href = `${url}/api/auth/singin-page`;
        })
        .catch(err => console.log(err.response.data))
});

$("#create_user-form").on('submit', (e) => {
    $("#create_user-submit_id").prop('disabled', true);
    e.preventDefault();

    const username = $("#username_id").val();
    const rol = $("#rol_id").val();
    const password = $("#password_id").val();
    const password_conf = $("#password_conf_id").val();

    axios({
        method: "POST",
        url: "/api/admin/create-user",
        headers: { "x-access-token": localStorage.getItem("auth") },
        data: {
            username,
            rol,
            password,
            password_conf
        },
    })
        .then((res) => {
            if(res.data.message === "Usuario Creado") window.location.reload();
            $("#create_user-submit_id").removeAttr('disabled');
        })
        .catch((err) => {
            console.log(err.response.data)
            verify_tok(err.response.data.message);
            $("#create_user-submit_id").removeAttr('disabled');
        })
});

$("#edit_user-form").on('submit', (e) => {
    $("#edit_user-submit_id").prop('disabled', true);
    e.preventDefault();

    const id = $("#id_edit_id").val();
    const username = $("#username_edit_id").val();
    const rol = $("#rol_edit_id").val();
    const password = $("#password_edit_id").val();
    const password_conf = $("#password_conf_edit_id").val();

    axios({
        method: "PUT",
        url: `/api/admin/edit-user/${id}`,
        headers: { "x-access-token": localStorage.getItem("auth") },
        data: {
            username,
            rol,
            password,
            password_conf
        },
    })
        .then((res) => {
            if(res.data.message === "Usuario Editado") return_home();
            $("#edit_user-submit_id").removeAttr('disabled');
        })
        .catch((err) => {
            console.log(err.response.data)
            verify_tok(err.response.data.message);
            $("#edit_user-submit_id").removeAttr('disabled');
        })
});

const edit_user_form = (userID) => {
    window.location.href = `${url}/api/admin/edit-user/${userID}`;
}

const return_home = () => {
    window.location.href = `${url}/api/admin/dashboard`;
}

const delete_user_form = (formId) => {
    $(`#delete_user-submit_id-${formId}`).prop('disabled', true);

    const id = $(`#delete_user-form_id-${formId}`).attr("name");
    axios({
        method: "DELETE",
        url: `/api/admin/delete-user/${id}`,
        headers: { "x-access-token": localStorage.getItem("auth") },
    })
        .then((res) => {
            console.log(res.data);
            if(res.data.message === "Usuario Eliminado") window.location.reload();
            $(`#delete_user-submit_id-${formId}`).removeAttr('disabled');
        })
        .catch((err) => {
            console.log(err.response.data)
            verify_tok(err.response.data.message);
            $(`#delete_user-submit_id-${formId}`).removeAttr('disabled');
        })
}

const verify_tok = (res) => {
    
    if(
        res === "No token provided" || 
        res === "No user found" ||
        res === "Session expired" ||
        res === "Unauthorized or session expired" ||
        res === "Unauthorized, only Admin"
    ) window.location.href = `${url}/api/auth/singin-page`;
    
}

// Comercial
$("#comercial_file_upload-form").on('submit', (e) => {
    $("#comercial_file_upload-submit_id").prop('disabled', true);
    e.preventDefault();
    const formData = new FormData(document.getElementById("comercial_file_upload-form"));

    $.ajax({
        type: "POST",
        url: `/api/admin/comercial-upload-file`,
        headers: {"x-access-token": localStorage.getItem("auth")},
        data: formData,
        processData: false,
        contentType: false,
        success: (res) => {
            console.log(res);
            if(res.message === "Archivo Cargado") window.location.reload();
            $("#comercial_file_upload-submit_id").removeAttr('disabled');
        },
        error: (err) => {
            console.log(err)
            verify_tok(err.message);
            $("#comercial_file_upload-submit_id").removeAttr('disabled');
        }
    });
});

const delete_file_comercial_form = (formId) => {
    $(`#delete_comercial_file-submit_id-${formId}`).prop('disabled', true);

    const id = $(`#id_delete_comercial_file_id-${formId}`).val();
    axios({
        method: "POST",
        url: `/api/admin/comercial-delete-file/${id}`,
        headers: { "x-access-token": localStorage.getItem("auth") },
    })
        .then((res) => {
            if(res.data.message === "Archivo Eliminado") window.location.reload();
            $(`#delete_comercial_file-submit_id-${formId}`).removeAttr('disabled');
        })
        .catch((err) => {
            console.log(err.response.data)
            verify_tok(err.response.data.message);
            $(`#delete_comercial_file-submit_id-${formId}`).removeAttr('disabled');
        })
}

const show_file_comercial = (fileId) => {

    const id = $(`#file_comercial-${fileId}`).attr("name");

    axios({
        method: "GET",
        url: `/uploads/comercial/${id}`,
        headers: { "x-access-token": localStorage.getItem("auth") },
    })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err.response.data)
            verify_tok(err.response.data.message);
        })
    
}

// RH
$("#rh_file_upload-form").on('submit', (e) => {
    $("#rh_file_upload-submit_id").prop('disabled', true);
    e.preventDefault();
    const formData = new FormData(document.getElementById("rh_file_upload-form"));

    $.ajax({
        type: "POST",
        url: `/api/admin/rh-upload-file`,
        headers: {"x-access-token": localStorage.getItem("auth")},
        data: formData,
        processData: false,
        contentType: false,
        success: (res) => {
            console.log(res);
            if(res.message === "Archivo Cargado") window.location.reload();
            $("#rh_file_upload-submit_id").removeAttr('disabled');
        },
        error: (err) => {
            console.log(err)
            verify_tok(err.message);
            $("#rh_file_upload-submit_id").removeAttr('disabled');
        }
    });
});

const delete_file_rh_form = (formId) => {
    $(`#delete_rh_file-submit_id-${formId}`).prop('disabled', true);

    const id = $(`#id_delete_rh_file_id-${formId}`).val();
    axios({
        method: "POST",
        url: `/api/admin/rh-delete-file/${id}`,
        headers: { "x-access-token": localStorage.getItem("auth") },
    })
        .then((res) => {
            if(res.data.message === "Archivo Eliminado") window.location.reload();
            $(`#delete_rh_file-submit_id-${formId}`).removeAttr('disabled');
        })
        .catch((err) => {
            console.log(err.response.data)
            verify_tok(err.response.data.message);
            $(`#delete_rh_file-submit_id-${formId}`).removeAttr('disabled');
        })
}

