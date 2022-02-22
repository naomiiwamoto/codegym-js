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

    const GetPageNumber = document.getElementById("GetPageNumber").value;
    const GetperPage = document.getElementById("GetperPage").value;
    const GetKeyword = document.getElementById("GetKeyword").value;

    let data = {};

    //キーワードは入っている場合にリクエストパラメータに入れる
    if (GetKeyword !== '') { //キーワード記入
        data.q = GetKeyword;
    }
    if (GetPageNumber !== '') {//ページ番号
        data.page = GetPageNumber;
    }
    if (GetperPage !== '') {//ページ取得件数
        data.per_page = GetperPage;
    }
    let url = host + '/users?' +
        Object.entries(data)
            .map((e) => {
                let key = e[0];
                let value = encodeURI(e[1]);
                return `${key}=${value}`;
            })
            .join("&");

    console.log(url)

    const token = localStorage.getItem('token')

    fetch(url, {
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
