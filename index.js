import { tweetsData } from "./data.js";

const tweetInput = document.getElementById("tweet-input-area");
const tweetBtn = document.getElementById("tweet-btn");

tweetBtn.addEventListener("click", function () {
    console.log(tweetInput.value);
});

document.addEventListener("click", function (e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like);
    }
    else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
})

function handleLikeClick(tweetId) {
    const targetTweetObject = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]
    if (!targetTweetObject.isLiked) {
        targetTweetObject.likes++
        
    } else{
        targetTweetObject.likes--
    }
    targetTweetObject.isLiked = !targetTweetObject.isLiked
    
    render();
}


function handleRetweetClick(tweetId) {
    const targetTweetObject = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]
    if (!targetTweetObject.isRetweeted) {
        targetTweetObject.retweets++
    } else {
        targetTweetObject.retweets--
    }
    targetTweetObject.isRetweeted = !targetTweetObject.isRetweeted
    render()
}





function getFeedHtml() {
    let feedHTML = ``;
    tweetsData.forEach(function (tweet) {
        let likeIconClass =``
        let retweetIconClass =``
        if (tweet.isLiked) {
            likeIconClass = 'liked'
        }

        if (tweet.isRetweeted) {
            retweetIconClass = `retweeted`
        }
        let repliesHtml = ``

        if (tweet.replies.length > 0) {
            tweet.replies.forEach(function (reply) {
                repliesHtml += `
                <div class="tweet-reply">
            <div class="tweet-inner">
                <img src="${reply.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${reply.handle}</p >
                        <p class="tweet-text">${reply.tweetText}</p>
                    </div>
                </div>
            </div>`
            
            })

        }

        feedHTML += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots" data-reply = "${tweet.uuid}"></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-heart ${likeIconClass}" data-like = "${tweet.uuid}" ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet ${retweetIconClass} " data-retweet= "${tweet.uuid}" ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
</div>
<div id ="replies-${tweet.uuid}">
${repliesHtml}
`;

    })
    return feedHTML
}

function render() {
    document.getElementById('feed').innerHTML = getFeedHtml();
}
render()
