//const url = "http://localhost:3333";
const url = "http://165.227.199.243:3333";

$("#logIn-form").on('submit', (e) => {
    e.preventDefault();
    const alert_view = $('#alert');
    alert_view.css({"background-color": "#6e6e6e85"}).show();

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
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.log(res);
            localStorage.setItem("auth", res.data.token);
            const userUrl = res.data.url;
            window.location.href = `${url}${userUrl}`;
        })
        .catch(err => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.error(err.response);
            alert(JSON.stringify(err.response.data.message));
        })
});

$("#logOut-form").on('submit', (e) => {
    e.preventDefault();
    const alert_view = $('#alert');
    alert_view.css({"background-color": "#6e6e6e85"}).show();

    axios({
        method: "POST",
        url: "/api/auth/logout",
        headers: { "x-access-token": localStorage.getItem("auth") },
    })
        .then((res) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            localStorage.removeItem("auth");
            window.location.href = `${url}/api/auth/singin-page`;
        })
        .catch(err => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.log(err.response.data)
        })
});

$("#create_user-form").on('submit', (e) => {
    const alert_view = $('#alert');
    alert_view.css({"background-color": "#6e6e6e85"}).show();
    let buton_disabled = $("#create_user-submit_id");
    buton_disabled.prop('disabled', true);
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
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.log(res.data.message);
            if (res.data.message === "Usuario Creado") window.location.reload();
            buton_disabled.removeAttr('disabled');
            
        })
        .catch((err) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.error(err.response);
            verify_tok(err.response.data.message);
            alert(JSON.stringify(err.response.data.message));
            buton_disabled.removeAttr('disabled');
        })
});

$("#edit_user-form").on('submit', (e) => {
    const alert_view = $('#alert');
    alert_view.css({"background-color": "#6e6e6e85"}).show();
    let buton_disabled = $("#edit_user-submit_id");
    buton_disabled.prop('disabled', true);
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
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.log(res.data.message);
            if (res.data.message === "Usuario Editado") return_home();
            buton_disabled.removeAttr('disabled');
        })
        .catch((err) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.error(err.response);
            verify_tok(err.response.data.message);
            alert(JSON.stringify(err.response.data.message));
            buton_disabled.removeAttr('disabled');
        })
});

const edit_user_form = (userID) => {
    window.location.href = `${url}/api/admin/edit-user/${userID}`;
}

const return_home = () => {
    window.location.href = `${url}/api/admin/dashboard`;
}

const delete_user_form = (formId) => {
    const buton_disabled = $(`#delete_user-submit_id-${formId}`);
    buton_disabled.prop('disabled', true);

    const id = $(`#delete_user-form_id-${formId}`).attr("name");
    axios({
        method: "DELETE",
        url: `/api/admin/delete-user/${id}`,
        headers: { "x-access-token": localStorage.getItem("auth") },
    })
        .then((res) => {
            console.log(res.data.message);
            if (res.data.message === "Usuario Eliminado") window.location.reload();
            buton_disabled.removeAttr('disabled');
        })
        .catch((err) => {
            console.error(err.response);
            verify_tok(err.response.data.message);
            alert(JSON.stringify(err.response.data.message));
            buton_disabled.removeAttr('disabled');
        })
}

const verify_tok = (res) => {

    if (
        res === "No token provided" ||
        res === "No user found" ||
        res === "Session expired" ||
        res === "Unauthorized or session expired" ||
        res === "Unauthorized, only Admin"
    ) window.location.href = `${url}/api/auth/singin-page`;

}

// DG
$("#dg_file_upload-form").on('submit', (e) => {
    const alert_view = $('#alert');
    alert_view.css({"background-color": "#6e6e6e85"}).show();
    const buton_disabled = $("#dg_file_upload-submit_id");
    buton_disabled.prop('disabled', true);
    e.preventDefault();
    const formData = new FormData(document.getElementById("dg_file_upload-form"));

    $.ajax({
        type: "POST",
        url: `/api/admin/dg-upload-file`,
        headers: { "x-access-token": localStorage.getItem("auth") },
        data: formData,
        processData: false,
        contentType: false,
        success: (res) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.log(res);
            if (res.message === "Archivo Cargado") window.location.reload();
            buton_disabled.removeAttr('disabled');
        },
        error: (err) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.error(err);
            if (err.responseJSON) {
                console.error(err.responseJSON);
                alert(JSON.stringify(err.responseJSON.message));
                verify_tok(err.responseJSON.message);

            }
            else {
                const error_multer = err.responseText.split("pre>");
                if (error_multer[1].slice(0, -2) === "Error: Archivo no valido") {
                    console.error("Error: Archivo no valido");
                    alert("Error: Archivo no valido");

                }
                else {
                    console.error("Error: El archivo debe ser menor a 30MB");
                    alert("Error: El archivo debe ser menor a 30MB");

                }
                buton_disabled.removeAttr('disabled');
            }
        }
    });
});

const delete_file_dg_form = (formId) => {
    const alert_view = $('#alert');
    alert_view.css({"background-color": "#6e6e6e85"}).show();
    const buton_disabled = $(`#delete_dg_file-submit_id-${formId}`);
    buton_disabled.prop('disabled', true);

    const id = $(`#id_delete_dg_file_id-${formId}`).val();
    axios({
        method: "POST",
        url: `/api/admin/dg-delete-file/${id}`,
        headers: { "x-access-token": localStorage.getItem("auth") },
    })
        .then((res) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            if (res.data.message === "Archivo Eliminado") window.location.reload();
            buton_disabled.removeAttr('disabled');
        })
        .catch((err) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.log(err.response.data.mesage);
            alert(JSON.stringify(err.response.data.message));
            verify_tok(err.response.data.message);
            buton_disabled.removeAttr('disabled');
        });
}

// Administracion
$("#administracion_file_upload-form").on('submit', (e) => {
    const alert_view = $('#alert');
    alert_view.css({"background-color": "#6e6e6e85"}).show();
    const buton_disabled = $("#administracion_file_upload-submit_id");
    buton_disabled.prop('disabled', true);
    e.preventDefault();
    const formData = new FormData(document.getElementById("administracion_file_upload-form"));

    $.ajax({
        type: "POST",
        url: `/api/admin/administracion-upload-file`,
        headers: { "x-access-token": localStorage.getItem("auth") },
        data: formData,
        processData: false,
        contentType: false,
        success: (res) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.log(res);
            if (res.message === "Archivo Cargado") window.location.reload();
            buton_disabled.removeAttr('disabled');
        },
        error: (err) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.error(err);
            if (err.responseJSON) {
                console.error(err.responseJSON);
                verify_tok(err.responseJSON.message);
                alert(JSON.stringify(err.responseJSON.message));

            }
            else {
                const error_multer = err.responseText.split("pre>");
                if (error_multer[1].slice(0, -2) === "Error: Archivo no valido") {
                    console.error("Error: Archivo no valido");
                    alert("Error: Archivo no valido");

                }
                else {
                    console.error("Error: El archivo debe ser menor a 30MB");
                    alert("Error: El archivo debe ser menor a 30MB");

                }
                buton_disabled.removeAttr('disabled');
            }
        }
    });
});

const delete_file_administracion_form = (formId) => {
    const alert_view = $('#alert');
    alert_view.css({"background-color": "#6e6e6e85"}).show();
    const buton_disabled = $(`#delete_administracion_file-submit_id-${formId}`);
    buton_disabled.prop('disabled', true);

    const id = $(`#id_delete_administracion_file_id-${formId}`).val();
    axios({
        method: "POST",
        url: `/api/admin/administracion-delete-file/${id}`,
        headers: { "x-access-token": localStorage.getItem("auth") },
    })
        .then((res) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            if (res.data.message === "Archivo Eliminado") window.location.reload();
            buton_disabled.removeAttr('disabled');
        })
        .catch((err) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.log(err.response.data.mesage);
            alert(JSON.stringify(err.response.data.message));
            verify_tok(err.response.data.message);
            buton_disabled.removeAttr('disabled');
        });
}

// RH
$("#rh_file_upload-form").on('submit', (e) => {
    const alert_view = $('#alert');
    alert_view.css({"background-color": "#6e6e6e85"}).show();
    const buton_disabled = $("#rh_file_upload-submit_id");
    buton_disabled.prop('disabled', true);
    e.preventDefault();
    const formData = new FormData(document.getElementById("rh_file_upload-form"));

    $.ajax({
        type: "POST",
        url: `/api/admin/rh-upload-file`,
        headers: { "x-access-token": localStorage.getItem("auth") },
        data: formData,
        processData: false,
        contentType: false,
        success: (res) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.log(res);
            if (res.message === "Archivo Cargado") window.location.reload();
            buton_disabled.removeAttr('disabled');
        },
        error: (err) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.error(err);
            if (err.responseJSON) {
                console.error(err.responseJSON);
                verify_tok(err.responseJSON.message);
                alert(JSON.stringify(err.responseJSON.message));

            }
            else {
                const error_multer = err.responseText.split("pre>");
                if (error_multer[1].slice(0, -2) === "Error: Archivo no valido") {
                    console.error("Error: Archivo no valido");
                    alert("Error: Archivo no valido");

                }
                else {
                    console.error("Error: El archivo debe ser menor a 30MB");
                    alert("Error: El archivo debe ser menor a 30MB");

                }
                buton_disabled.removeAttr('disabled');
            }
        }
    });
});

const delete_file_rh_form = (formId) => {
    const alert_view = $('#alert');
    alert_view.css({"background-color": "#6e6e6e85"}).show();
    const buton_disabled = $(`#delete_rh_file-submit_id-${formId}`);
    buton_disabled.prop('disabled', true);

    const id = $(`#id_delete_rh_file_id-${formId}`).val();
    axios({
        method: "POST",
        url: `/api/admin/rh-delete-file/${id}`,
        headers: { "x-access-token": localStorage.getItem("auth") },
    })
        .then((res) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            if (res.data.message === "Archivo Eliminado") window.location.reload();
            buton_disabled.removeAttr('disabled');
        })
        .catch((err) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.log(err.response.data.mesage);
            alert(JSON.stringify(err.response.data.message));
            verify_tok(err.response.data.message);
            buton_disabled.removeAttr('disabled');
        });
}

// Comercial 1
$("#comercial1_file_upload-form").on('submit', (e) => {
    const alert_view = $('#alert');
    alert_view.css({"background-color": "#6e6e6e85"}).show();
    const buton_disabled = $("#comercial1_file_upload-submit_id");
    buton_disabled.prop('disabled', true);
    e.preventDefault();
    const formData = new FormData(document.getElementById("comercial1_file_upload-form"));

    $.ajax({
        type: "POST",
        url: `/api/admin/comercial1-upload-file`,
        headers: { "x-access-token": localStorage.getItem("auth") },
        data: formData,
        processData: false,
        contentType: false,
        success: (res) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.log(res);
            if (res.message === "Archivo Cargado") window.location.reload();
            buton_disabled.removeAttr('disabled');
        },
        error: (err) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.error(err);
            if (err.responseJSON) {
                console.error(err.responseJSON);
                verify_tok(err.responseJSON.message);
                alert(JSON.stringify(err.responseJSON.message));

            }
            else {
                const error_multer = err.responseText.split("pre>");
                if (error_multer[1].slice(0, -2) === "Error: Archivo no valido") {
                    console.error("Error: Archivo no valido");
                    alert("Error: Archivo no valido");

                }
                else {
                    console.error("Error: El archivo debe ser menor a 30MB");
                    alert("Error: El archivo debe ser menor a 30MB");

                }
                buton_disabled.removeAttr('disabled');
            }
        }
    });
});

const delete_file_comercial1_form = (formId) => {
    const alert_view = $('#alert');
    alert_view.css({"background-color": "#6e6e6e85"}).show();
    const buton_disabled = $(`#delete_comercial1_file-submit_id-${formId}`);
    buton_disabled.prop('disabled', true);

    const id = $(`#id_delete_comercial1_file_id-${formId}`).val();
    axios({
        method: "POST",
        url: `/api/admin/comercial1-delete-file/${id}`,
        headers: { "x-access-token": localStorage.getItem("auth") },
    })
        .then((res) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            if (res.data.message === "Archivo Eliminado") window.location.reload();
            buton_disabled.removeAttr('disabled');
        })
        .catch((err) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.log(err.response.data.mesage);
            alert(JSON.stringify(err.response.data.message));
            verify_tok(err.response.data.message);
            buton_disabled.removeAttr('disabled');
        });
}

// Comercial 2
$("#comercial2_file_upload-form").on('submit', (e) => {
    const alert_view = $('#alert');
    alert_view.css({"background-color": "#6e6e6e85"}).show();
    const buton_disabled = $("#comercial2_file_upload-submit_id");
    buton_disabled.prop('disabled', true);
    e.preventDefault();
    const formData = new FormData(document.getElementById("comercial2_file_upload-form"));

    $.ajax({
        type: "POST",
        url: `/api/admin/comercial2-upload-file`,
        headers: { "x-access-token": localStorage.getItem("auth") },
        data: formData,
        processData: false,
        contentType: false,
        success: (res) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.log(res);
            if (res.message === "Archivo Cargado") window.location.reload();
            buton_disabled.removeAttr('disabled');
        },
        error: (err) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.error(err);
            if (err.responseJSON) {
                console.error(err.responseJSON);
                verify_tok(err.responseJSON.message);
                alert(JSON.stringify(err.responseJSON.message));

            }
            else {
                const error_multer = err.responseText.split("pre>");
                if (error_multer[1].slice(0, -2) === "Error: Archivo no valido") {
                    console.error("Error: Archivo no valido");
                    alert("Error: Archivo no valido");

                }
                else {
                    console.error("Error: El archivo debe ser menor a 30MB");
                    alert("Error: El archivo debe ser menor a 30MB");

                }
                buton_disabled.removeAttr('disabled');
            }
        }
    });
});

const delete_file_comercial2_form = (formId) => {
    const alert_view = $('#alert');
    alert_view.css({"background-color": "#6e6e6e85"}).show();
    const buton_disabled = $(`#delete_comercial2_file-submit_id-${formId}`);
    buton_disabled.prop('disabled', true);

    const id = $(`#id_delete_comercial2_file_id-${formId}`).val();
    axios({
        method: "POST",
        url: `/api/admin/comercial2-delete-file/${id}`,
        headers: { "x-access-token": localStorage.getItem("auth") },
    })
        .then((res) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            if (res.data.message === "Archivo Eliminado") window.location.reload();
            buton_disabled.removeAttr('disabled');
        })
        .catch((err) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.log(err.response.data.mesage);
            alert(JSON.stringify(err.response.data.message));
            verify_tok(err.response.data.message);
            buton_disabled.removeAttr('disabled');
        });
}

// Comercial 3
$("#comercial3_file_upload-form").on('submit', (e) => {
    const alert_view = $('#alert');
    alert_view.css({"background-color": "#6e6e6e85"}).show();
    const buton_disabled = $("#comercial3_file_upload-submit_id");
    buton_disabled.prop('disabled', true);
    e.preventDefault();
    const formData = new FormData(document.getElementById("comercial3_file_upload-form"));

    $.ajax({
        type: "POST",
        url: `/api/admin/comercial3-upload-file`,
        headers: { "x-access-token": localStorage.getItem("auth") },
        data: formData,
        processData: false,
        contentType: false,
        success: (res) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.log(res);
            if (res.message === "Archivo Cargado") window.location.reload();
            buton_disabled.removeAttr('disabled');
        },
        error: (err) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.error(err);
            if (err.responseJSON) {
                console.error(err.responseJSON);
                verify_tok(err.responseJSON.message);
                alert(JSON.stringify(err.responseJSON.message));

            }
            else {
                const error_multer = err.responseText.split("pre>");
                if (error_multer[1].slice(0, -2) === "Error: Archivo no valido") {
                    console.error("Error: Archivo no valido");
                    alert("Error: Archivo no valido");

                }
                else {
                    console.error("Error: El archivo debe ser menor a 30MB");
                    alert("Error: El archivo debe ser menor a 30MB");

                }
                buton_disabled.removeAttr('disabled');
            }
        }
    });
});

const delete_file_comercial3_form = (formId) => {
    const alert_view = $('#alert');
    alert_view.css({"background-color": "#6e6e6e85"}).show();
    const buton_disabled = $(`#delete_comercial3_file-submit_id-${formId}`);
    buton_disabled.prop('disabled', true);

    const id = $(`#id_delete_comercial3_file_id-${formId}`).val();
    axios({
        method: "POST",
        url: `/api/admin/comercial3-delete-file/${id}`,
        headers: { "x-access-token": localStorage.getItem("auth") },
    })
        .then((res) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            if (res.data.message === "Archivo Eliminado") window.location.reload();
            buton_disabled.removeAttr('disabled');
        })
        .catch((err) => {
            alert_view.css({"background-color": "#6e6e6e"}).hide();
            console.log(err.response.data.mesage);
            alert(JSON.stringify(err.response.data.message));
            verify_tok(err.response.data.message);
            buton_disabled.removeAttr('disabled');
        });
}

// Files
function redirectFileDG(fileId) {
    const file = $(`#file-${fileId}`).attr("name");
    const token = localStorage.getItem("auth");
    window.location.href = `${url}/uploads/direccion-general/${file}?token=${token}`;

}

function redirectFileAdministracion(fileId) {
    const file = $(`#file-${fileId}`).attr("name");
    const token = localStorage.getItem("auth");
    window.location.href = `${url}/uploads/administracion/${file}?token=${token}`;

}

function redirectFileRH(fileId) {
    const file = $(`#file-${fileId}`).attr("name");
    const token = localStorage.getItem("auth");
    window.location.href = `${url}/uploads/recursos-humanos/${file}?token=${token}`;

}

function redirectFileComercial1(fileId) {
    const file = $(`#file-${fileId}`).attr("name");
    const token = localStorage.getItem("auth");
    window.location.href = `${url}/uploads/comercial1/${file}?token=${token}`;

}

function redirectFileComercial2(fileId) {
    const file = $(`#file-${fileId}`).attr("name");
    const token = localStorage.getItem("auth");
    window.location.href = `${url}/uploads/comercial2/${file}?token=${token}`;

}

function redirectFileComercial3(fileId) {
    const file = $(`#file-${fileId}`).attr("name");
    const token = localStorage.getItem("auth");
    window.location.href = `${url}/uploads/comercial3/${file}?token=${token}`;

}