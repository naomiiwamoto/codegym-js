const p = console.log;
const host = 'http://localhost'; //ローカルで掲示板を動かす場合の設定

//register
const buttonRegisterSubmit = document.getElementById("registerSubmit");
const clickRegisterSubmit = () => {

    const registerName = document.getElementById("registerName").value;
    const registerBio = document.getElementById("registerBio").value;
    const registerPassword = document.getElementById("registerPassword").value;
    const data = {
        "name": registerName,
        "bio": registerBio,
        "password": registerPassword
    };
    fetch(host + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();//JSON形式でデータを受け取る
    }).then(json => {
        console.log(json);
    }).catch(response => {//通知に失敗した時の処理
        console.log(response);
    });
};
buttonRegisterSubmit.addEventListener('click', clickRegisterSubmit); //ボタンにイベントリスナーを紐づける

//login
const buttonLoginSubmit = document.getElementById("loginSubmit");
const clickLoginSubmit = () => {

    const loginName = document.getElementById("loginName").value
    const loginPassword = document.getElementById("loginPassword").value
    const data = {
        "name": loginName,
        "password": loginPassword
    };
    fetch(host + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).then(json => {
        localStorage.setItem('token', json.token);
        console.log(json);
    }).catch(response => {
        console.log(response);
    });
};
buttonLoginSubmit.addEventListener('click', clickLoginSubmit);

//logout
const buttonlogoutSubmit = document.getElementById("logoutSubmit");
const clicklogoutButton = () => {

    const token = localStorage.getItem('token')
    fetch(host + '/logout', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    }).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
        const message = json.message;
        document.getElementById("logoutComment").innerText = message;
    }).catch(response => {
        console.log(response);
    });
};
buttonlogoutSubmit.addEventListener('click', clicklogoutButton);


//usersIdGet
const buttonUsersIdGetSubmit = document.getElementById("usersIdGetSubmit");
const clickUsersIdGetSubmit = () => {

    const usersIdGetId = document.getElementById('usersIdGetId').value;
    const token = localStorage.getItem('token')
    fetch(host + '/users/' + usersIdGetId, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        },
    }).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
    }).catch(response => {
        console.log(response);
    });
};
buttonUsersIdGetSubmit.addEventListener('click', clickUsersIdGetSubmit);

//usersGet
const buttonUsersGetSubmit = document.getElementById("usersGetSubmit");
const clickUsersGetSubmit = () => {
    const params = {

        page: document.getElementById("GetPageNumber").value,
        per_page: document.getElementById("GetperPage").value,
        q: document.getElementById("GetKeyword").value,
    };
    const queryParams = new URLSearchParams(params);
    const token = localStorage.getItem('token')
    fetch(host + '/users?' + queryParams, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        },
    }).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
    }).catch(response => {
        console.log(response);
    });
};
buttonUsersGetSubmit.addEventListener('click', clickUsersGetSubmit);

//usersDelete(ログインユーザを削除する)
const buttonUsersDeleteSubmit = document.getElementById("usersDeleteSubmit");
const clickUsersDeleteSubmit = () => {
    const token = localStorage.getItem('token')
    fetch(host + '/users', {
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + token
        },
    }).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
    }).catch(response => {
        console.log(response);
    });
};
buttonUsersDeleteSubmit.addEventListener('click', clickUsersDeleteSubmit);

//usersEdit(ログインユーザを編集する)
const buttonUsersEditSubmit = document.getElementById("usersEditSubmit");
const clickUsersEditSubmit = () => {
    const usersEditBio = document.getElementById("usersEditBio").value;
    const data = {
        "bio": usersEditBio
    };
    const token = localStorage.getItem('token')
    fetch(host + '/users', {
        method: "PATCH",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
    }).catch(response => {
        console.log(response);
    });
};
buttonUsersEditSubmit.addEventListener('click', clickUsersEditSubmit);

//threadpost
const buttonthreadsPostSubmit = document.getElementById("threadsPostSubmit");
const clickThreadSubmi = () => {
    const threadsPostTitle = document.getElementById("threadsPostTitle").value;
    const data = {
        "title": threadsPostTitle
    };
    const token = localStorage.getItem('token')
    fetch(host + '/threads', {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
    }).catch(response => {
        console.log(response);
    });
};
buttonthreadsPostSubmit.addEventListener('click', clickThreadSubmi);

//threadList 
const buttonthreadGetListSubmit = document.getElementById("threadGetListSubmit");
const clickThreadListSubmit = () => {
    const params = {
        Per_Page: document.getElementById("threadsGetPerPage").value,
        page: document.getElementById("threadsGetPage").value,
        q: document.getElementById("threadsGetQ").value,
    };
    const queryParams = new URLSearchParams(params);
    const token = localStorage.getItem('token')
    fetch(host + '/threads?' + queryParams, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
    }).catch(response => {
        console.log(response);
    });
};
buttonthreadGetListSubmit.addEventListener('click', clickThreadListSubmit);

//threadGet (スレッドを取得する)
const buttonthreadGetIdSubmit = document.getElementById("threadGetIdSubmit");
const clickthreadGetIdSubmit = () => {

    const threadGetId = document.getElementById("threadGetId").value;
    const token = localStorage.getItem('token')
    fetch(host + '/threads/' + threadGetId, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    }).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
    }).catch(response => {
        console.log(response);
    });
};
buttonthreadGetIdSubmit.addEventListener('click', clickthreadGetIdSubmit);

//threadGetId (自分の thread を編集する。)
const buttonthreadEditingSubmit = document.getElementById("threadEditingSubmit");
const clickthreadEditingSubmit = () => {

    const threadEditingGetId = document.getElementById("threadEditingGetId").value;
    const titleEdit = document.getElementById("titleEdit").value;
    const token = localStorage.getItem('token')
    const data = {
        "title": titleEdit
    };
    fetch(host + '/threads/' + threadEditingGetId, {
        method: "PATCH",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
    }).catch(response => {
        console.log(response);
    });
};
buttonthreadEditingSubmit.addEventListener('click', clickthreadEditingSubmit);

//repliesPost
const buttonrepliesPostSubmit = document.getElementById("repliesPostSubmit");
const clickrepliesPostSubmit = () => {
    const repliesPostText = document.getElementById("repliesPostText").value;
    const repliesPostThreadId = document.getElementById("repliesPostThreadId").value;
    const data = {
        "thread_id": repliesPostThreadId,
        "text": repliesPostText
    };
    const token = localStorage.getItem('token')
    fetch(host + '/replies', {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
    }).catch(response => {
        console.log(response);
    });
};
buttonrepliesPostSubmit.addEventListener('click', clickrepliesPostSubmit);

//repGetidSubmit
const buttonrepGetidSubmit = document.getElementById("repGetidSubmit");
const clickrepGetidSubmit = () => {
    const rep_id = document.getElementById("rep_id").value;
    const token = localStorage.getItem('token')
    fetch(host + '/replies/' + rep_id, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    }).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
    }).catch(response => {
        console.log(response);
    });
};
buttonrepGetidSubmit.addEventListener('click', clickrepGetidSubmit);

//repliesList 
const buttonrepliesGetSubmit = document.getElementById("repliesGetSubmit");
const clickrepliesGetSubmit = () => {
    const params = {
        thread_id: document.getElementById("thread_id").value,
        Per_Page: document.getElementById("repliesGetPerPage").value,
        page: document.getElementById("repliesGetPage").value,
        q: document.getElementById("repliesGetQ").value,
    };
    const queryParams = new URLSearchParams(params);
    const token = localStorage.getItem('token')
    fetch(host + '/replies?' + queryParams, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
    }).catch(response => {
        console.log(response);
    });
};
buttonrepliesGetSubmit.addEventListener('click', clickrepliesGetSubmit);

//repEditSubmit
const buttonrepEditSubmit = document.getElementById("repEditSubmit");
const clickrepEditSubmit = () => {
    const repEditId = document.getElementById("repEditId").value;
    const reprepEdit = document.getElementById("reprepEdit").value;
    const data = {
        "text": reprepEdit
    };
    const token = localStorage.getItem('token')
    fetch(host + '/replies/' + repEditId, {
        method: "PATCH",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
    }).catch(response => {
        console.log(response);
    });
};
buttonrepEditSubmit.addEventListener('click', clickrepEditSubmit);

//repDelete
const buttonrepDataDeleteSubmit = document.getElementById("repDataDeleteSubmit");
const clickrepDataDeleteSubmit = () => {
    const repId = document.getElementById("repId").value;
    const token = localStorage.getItem('token')
    fetch(host + '/replies/' + repId, {
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + token
        },
    }).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
    }).catch(response => {
        console.log(response);
    });
};
buttonrepDataDeleteSubmit.addEventListener('click', clickrepDataDeleteSubmit);
