let data = '';
const contentMainElem = document.querySelector('.content');
// const commentChainHolderElem = document.querySelector('.commentsChainHolder');
// const userAddCommentHolder = document.querySelector('.userAddCommentHolder');
async function getData() {
    let tempdata = await fetch('./data.json')
            .then(resp => resp.json())
            .then(jsondata => {console.log('got data now which is:', jsondata); data = jsondata;});
    console.log('data variable is:', data, 'while tempdata is:', tempdata);
    let commentChainHolder = document.createElement('div');
    commentChainHolder.className = 'commentsChainHolder';
    renderComments(commentChainHolder,data);
    // renderComments();
    let userAddCommentHolder = document.createElement('div');
    userAddCommentHolder.className = 'userAddCommentHolder';
    userAddCommentHolder.appendChild(makeOwnUserCommentBox());
    contentMainElem.appendChild(commentChainHolder);
    contentMainElem.appendChild(userAddCommentHolder);
}
function makeOwnUserCommentBox() {
    let userObj = data.currentUser;
    let divHolder = document.createElement('div');
    divHolder.className = 'userComment';

    let imgElem = document.createElement('img');
    imgElem.src = userObj.image.png;
    imgElem.className = 'profilepicClass'
    let textElem = document.createElement('div');
    textElem.name = 'userComment';
    textElem.className = 'commentTextAreaBox commentborder';
    textElem.contentEditable = 'true';
    let commentActionHolder = document.createElement('div');
    commentActionHolder.className = 'commentAction';
    commentActionHolder.appendChild(makeActionButton('send', 'Send'));
    divHolder.appendChild(imgElem);
    divHolder.appendChild(textElem);
    divHolder.appendChild(commentActionHolder);
    return divHolder;
}
function makeActionButton(classname, btnName) {
    let sendButton = document.createElement('button');
    sendButton.className = 'actionbutton ' + classname;
    sendButton.textContent = btnName;
    return sendButton;
}

function renderComments(commentChainHolderElem, data) {
  console.log('data for rendering comments is:', data);
  data.comments.forEach( commentObj => {
    let divHolder = document.createElement('div');
    divHolder.className = 'commentElem';
    let commentContent = makeComment(commentObj);
    divHolder.appendChild(commentContent);
    if (commentObj.replies.length > 0) {
        divHolder.appendChild(makeReplies(commentObj.replies));
    }
    commentChainHolderElem.appendChild(divHolder);
  })
}
function makeReplies(replyArr) {
    let divHolder = document.createElement('div');
    divHolder.className = 'replyContent';
    replyArr.forEach( replyObj => {
        divHolder.appendChild(makeReplyContent(replyObj));
    })
    return divHolder;
}
function makeReplyContent(replyObj) {
    let divHolder = document.createElement('div');
    divHolder.className = 'replyElem';
    let verticalElem = makeVerticalElem();
    let replyDivs = makeReplyDivs(replyObj);
    divHolder.appendChild(verticalElem);
    divHolder.appendChild(replyDivs);
    return divHolder;
}
function makeReplyDivs(replyObj) {
    return makeComment(replyObj);
}
function makeVerticalElem () {
    let divHolder = document.createElement('div');
    divHolder.className = 'verticalLine';
    let innerdiv = document.createElement('div');
    innerdiv.className = 'lineElem';
    divHolder.appendChild(innerdiv);
    return divHolder;
}
function makeComment(commentObj) {
    let divHolder = document.createElement('div');
    divHolder.className = 'comment';
    let scoreHolder = makeScoreHolder(commentObj.score);
    divHolder.append(scoreHolder);
    let contentHolder = makeContentHolder(commentObj);
    divHolder.appendChild(contentHolder);
    return divHolder;
}
function makeContentHolder(commentObj) {

    let divHolder = document.createElement('div');
    divHolder.className = 'contentHolder';
    let topContent = maketopContent(commentObj.user, commentObj.createdAt );
    let commentContent = makeCommentContent(commentObj.content);
    divHolder.appendChild(topContent);
    divHolder.appendChild(commentContent);
    if (commentObj.user.username == data.currentUser.username) {
        let updatebutton = makeActionButton(' update hidden ', 'Update');
        divHolder.appendChild(updatebutton);
    }
    return divHolder;
}
function maketopContent(userObj, timeposted) {
    //makeTopLeft also requires user -> username and profile pic
    let topleft = makeTopLeft(userObj, timeposted);
    let topRight = makeTopRight(userObj);
    let divHolder = document.createElement('div');
    divHolder.className = 'topContent';
    divHolder.appendChild(topleft);
    divHolder.appendChild(topRight);
    return divHolder;
}
function makeTopRight(userObj) {
    let currentUserName = data.currentUser.username;
    // console.log('curentUsername:', currentUserName, ' but current comment being parse is for ', userObj.username);
    let divHolder = document.createElement('div');
    divHolder.className = 'topRight';
    let userButtonelem = document.createElement('div');
    let replyButton = makeActionButton('reply ' + (currentUserName == userObj.username ? ' hidden '  : ' '), 'Reply');
    let deleteButton = makeActionButton('delete ' + (currentUserName == userObj.username ? ' ':' hidden '), 'Delete');
    let editButton = makeActionButton('edit ' + (currentUserName == userObj.username ? ' ': ' hidden '), 'Edit');
    userButtonelem.appendChild(replyButton);
    userButtonelem.appendChild(deleteButton);
    userButtonelem.appendChild(editButton);
    divHolder.appendChild(userButtonelem);
    return divHolder;

}
function makeTopLeft(userObj, timeposted = '1month ago') {

    let divHolder = document.createElement('div');
    divHolder.className = 'topleft';
    let imgelem = document.createElement('img');
    imgelem.className = 'profilepicClass';
    imgelem.src = userObj.image.png;
    imgelem.alt = 'user progile pic';
    let usernameElem = document.createElement('span');
    usernameElem.className = 'username';
    usernameElem.textContent = userObj.username;
    let timepostedElem = document.createElement('timeposted');
    timepostedElem.className = 'timeposted';
    timepostedElem.textContent = timeposted;
    divHolder.appendChild(imgelem);
    divHolder.appendChild(usernameElem);
    divHolder.appendChild(timepostedElem);
    return divHolder;
}
function makeCommentContent(commentContent = 'lorem lorem') {
    // let commentContent = 'Lorem loremt'
    
    let divHolder = document.createElement('div');
    divHolder.className = 'commentContent';
    divHolder.textContent = commentContent;
    return divHolder;
}
function makeScoreHolder(scoreValue) {
    let divHolder = document.createElement('div');
    divHolder.className = 'scoreHolder';
    let spanelem = document.createElement('span');
    spanelem.textContent = scoreValue;
    spanelem.className = 'scoreValue';
    let plusNode = document.createTextNode(' + ');
    let minusNode = document.createTextNode(' - ');
    divHolder.appendChild(plusNode);
    divHolder.appendChild(spanelem);
    divHolder.appendChild(minusNode);
    return divHolder;
}
getData();
console.log('main execution continues');
function handleClick(e) {
    // console.log(this, e, e.target);
    if (e.target.matches('button')) {
        // console.log('button clicked')
        e.stopPropagation();
        e.preventDefault();
        if (e.target.classList.contains('edit')) {
            // console.log('edit button called');
            let contentHolder = e.target.closest('.contentHolder');
            let contentBox = contentHolder.querySelector('.commentContent');
            contentBox.classList.add('commentborder');
            let updatebutton = contentHolder.querySelector('.update');
            if (updatebutton ) {
                updatebutton.classList.remove('hidden');
            }
        }
    }
}
contentMainElem.addEventListener('click', handleClick);