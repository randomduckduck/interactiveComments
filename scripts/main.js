let data = '';
const commentChainHolderElem = document.querySelector('.commentsChainHolder');
async function getData() {
    let tempdata = await fetch('./data.json')
            .then(resp => resp.json())
            .then(jsondata => {console.log('got data now which is:', jsondata); data = jsondata;});
    console.log('data variable is:', data, 'while tempdata is:', tempdata);
    renderComments();
}
function renderComments() {
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
    return divHolder;
}
function maketopContent(userObj, timeposted) {
    //makeTopLeft also requires user -> username and profile pic
    let topleft = makeTopLeft(userObj, timeposted);
    let topRight = makeTopRight();
    let divHolder = document.createElement('div');
    divHolder.className = 'topContent';
    divHolder.appendChild(topleft);
    divHolder.appendChild(topRight);
    return divHolder;
}
function makeTopRight() {
    let divHolder = document.createElement('div');
    divHolder.className = 'topRight';
    let userButtonelem = document.createElement('div');
    let replyButton = document.createElement('button');
    replyButton.className = 'Reply';
    replyButton.textContent = 'Reply';
    userButtonelem.appendChild(replyButton);
    divHolder.appendChild(userButtonelem);
    return divHolder;

}
function makeTopLeft(userObj, timeposted = '1month ago') {

    let divHolder = document.createElement('div');
    divHolder.className = 'topleft';
    let imgelem = document.createElement('img');
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