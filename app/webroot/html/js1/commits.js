// JavaScript Document
// https://cdn.webrtc-experiment.com/commits-dev.js
function addCommas(e) {
    return String(e).replace(/(\d)(?=(\d{3})+$)/g, "$1,")
}

function jsonp(e, t) {
    var a = document.createElement("script");
    a.src = e + "?callback=callback00", a.async = !0, t && (a.onload = t), document.body.appendChild(a)
}

function callback00(e) {
   /* "watch" == gType ? (counter.innerHTML = addCommas(e.data.watchers), console.log("watchers", e.data.watchers)) : "fork" == gType ? (counter.innerHTML = addCommas(e.data.forks), console.log("forks", e.data.forks)) : "follow" == gType && (counter.innerHTML = addCommas(e.data.followers), console.log("followers", e.data.followers)), counter.style.display = "block"*/
}

function gitinfo(e, t) {
    window.gType = e, mainButton = document.createElement("span"), mainButton.className = "github-btn", button = document.createElement("a"), button.target = "_blank", button.className = "gh-btn", mainButton.appendChild(button);
    var a = document.createElement("span");
    a.className = "gh-ico", button.appendChild(a), text = document.createElement("span"), text.className = "gh-text", button.appendChild(text), counter = document.createElement("a"), counter.target = "_blank", counter.className = "gh-count", counter.innerHTML = "+1K", mainButton.appendChild(counter), stargazers && stargazers.appendChild(mainButton), button.href = "https://github.com/" + repositoryURL + "/", "watch" == gType ? (mainButton.className += " github-watchers", text.innerHTML = "Star ", counter.href = "https://github.com/" + repositoryURL + "/stargazers") : "fork" == gType ? (mainButton.className += " github-forks", text.innerHTML = " Fork ", counter.href = "https://github.com/" + repositoryURL + "/network") : "follow" == gType && (mainButton.className += " github-me", text.innerHTML = "Follow @muaz-khan", button.href = "https://github.com/muaz-khan", counter.href = "https://github.com/muaz-khan/followers"), "follow" == gType ? jsonp("https://api.github.com/users/muaz-khan", t) : jsonp("https://api.github.com/repos/" + repositoryURL, t)
}

function issuesCallback(e) {
    githubIssues.innerHTML = "", e = e.data;
    var t = e.length;
    t > 5 && (t = 5);
    for (var a = 0; t > a; a++) {
        var r = e[a],
            n = document.createElement("div");
        n.className = "commit";
        var s = r.title;
        s.length > 50 ? (s = s.substr(0, 49) + "...", s = '<h2 title="' + r.title + '">' + s + "</h2><br />") : s = "<h2>" + r.title + "</h2><br />";
        var o = r.body;
        o = o.replace(/</g, "&lt;").replace(/>/g, "&gt;"), o = o.replace(urlRegex, shortenUrl).replace(/\n/g, "<br />"), o = o.replace(/\n/g, "<br />"), o = s + o, o = replaceMarkup(o);
        var c = document.createElement("div");
        c.className = "commit-desc", c.innerHTML = o, n.appendChild(c);
        var i = document.createElement("div");
        i.className = "commit-meta";
        var l = document.createElement("a");
        l.target = "_blank", l.href = r.html_url, l.className = "commit-url", l.innerHTML = r.comments + " Comments (Submitted " + timeDifference(new Date, new Date(r.created_at)) + ")", i.appendChild(l);
        var m = document.createElement("div");
        m.className = "authorship";
        var u = new Image(24, 24);
        u.className = "gravatar", r.user && r.user.avatar_url && (u.src = r.user.avatar_url), m.appendChild(u);
        var h = document.createElement("span");
        h.className = "author-name", h.innerHTML = '<a href="' + r.user.html_url + '" rel="author" target="_blank">' + r.user.login + "</a>", m.appendChild(h), i.appendChild(m), n.appendChild(i), githubIssues && githubIssues.appendChild(n)
    }
}

function getLatestIssues(e) {
    if (!githubIssues) return void(e && e());
    var t = document.createElement("script");
    t.src = "https://api.github.com/repos/" + repositoryURL + "/issues?sha=master&callback=issuesCallback", t.async = !0, e && (t.onload = e), document.body.appendChild(t)
}

function commitsCallback(e) {
    githubCommits.innerHTML = "", e = e.data;
    var t = e.length;
    t > 15 && (t = 15);
    for (var a = 0; t > a; a++) {
        var r = e[a],
            n = document.createElement("div");
        n.className = "commit";
        var s = r.commit.message;
        s = s.replace(/</g, "&lt;").replace(/>/g, "&gt;"), s = s.replace(urlRegex, shortenUrl).replace(/\n/g, "<br />"), s = s.replace(/\n/g, "<br />"), s = replaceMarkup(s);
        var o = document.createElement("div");
        o.className = "commit-desc", o.innerHTML = s, n.appendChild(o);
        var c = document.createElement("div");
        c.className = "commit-meta";
        var i = document.createElement("a");
        i.target = "_blank", i.href = r.html_url, i.className = "commit-url", i.innerHTML = timeDifference(new Date, new Date(r.commit.committer.date)), c.appendChild(i);
        var l = document.createElement("div");
        l.className = "authorship", r.author || (r.author = "muaz-khan");
        var m = new Image(24, 24);
        m.className = "gravatar", m.src = r.author.avatar_url, r.author && r.author.avatar_url || (m.src = "https://goo.gl/KaFpuL"), l.appendChild(m);
        var u = document.createElement("span");
        u.className = "author-name", u.innerHTML = '<a href="' + (r.author.html_url || "https://github.com/muaz-khan") + '" rel="author" target="_blank">' + (r.author.login || "Muaz Khan") + "</a>", l.appendChild(u), c.appendChild(l), n.appendChild(c), githubCommits && githubCommits.appendChild(n)
    }
}

function getLatestCommits(e) {
    var t = document.createElement("script");
    t.src = "https://api.github.com/repos/" + repositoryURL + "/commits?sha=master&callback=commitsCallback", t.async = !0, !e && githubIssues && (e = getLatestIssues), e && (t.onload = e), document.body.appendChild(t)
}

function timeDifference(e, t) {
    var a = 6e4,
        r = 60 * a,
        n = 24 * r,
        s = 30 * n,
        o = 365 * n,
        c = e - t;
    return a > c ? Math.round(c / 1e3) + " seconds ago" : r > c ? Math.round(c / a) + " minutes ago" : n > c ? Math.round(c / r) + " hours ago" : s > c ? Math.round(c / n) + " days ago" : o > c ? Math.round(c / s) + " months ago" : Math.round(c / o) + " years ago"
}

function replaceMarkup(e) {
    return e = e.replace(/```javascript([^```]+)```|```html([^```]+)```/g, "<pre>$1</pre>"), e = e.replace(/```JavaScript([^```]+)```|```html([^```]+)```/g, "<pre>$1</pre>"), e = e.replace(/```js([^```]+)```|```html([^```]+)```/g, "<pre>$1</pre>"), e = e.replace(/```([^```]+)```/g, "<pre>$1</pre>"), e = e.replace(/``([^``]+)``/g, "<pre>$1</pre>"), e = e.replace(/`([^`]+)`/g, "<code>$1</code>"), e = e.replace(/\*\*([^\*\*]+)\*\*/g, "<strong>$1</strong>"), e = e.replace(/#([0-9]+)/g, '<a href="https://github.com/' + repositoryURL + '/issues/$1" target="_blank">#$1</a>'), e = e.replace(/```([^```]+)```/g, "<pre>$1</pre>"), e = e.replace(/`([^`]+)`/g, "<code>$1</code>")
}

function getCommonjs() {
    var e = document.createElement("script");
    e.src = "https://cdn.webrtc-experiment.com/common.js", e.async = !0, document.body.appendChild(e)
}
var repositoryURL = window.useThisGithubPath || "muaz-khan/WebRTC-Experiment",
    stargazers = document.querySelector(".github-stargazers"),
    mainButton, counter, text, button;
gitinfo("watch", function() {
    var e;
    githubCommits ? e = getLatestCommits : githubIssues && (e = getLatestIssues), gitinfo("fork", function() {
        e ? e(function() {
            gitinfo("follow", function() {
                e != getLatestIssues && githubIssues && getLatestIssues()
            })
        }) : gitinfo("follow", function() {
            e != getLatestIssues && githubIssues && getLatestIssues()
        })
    })
});
var githubIssues = document.getElementById("github-issues");
githubIssues && (githubIssues.innerHTML = '<div style="padding:1em .8em;">Getting latest issues...</div>');
var githubCommits = document.getElementById("github-commits");
githubCommits && (githubCommits.innerHTML = '<div style="padding:1em .8em;">Getting latest commits...</div>');
var shortenUrl = function(e, t, a, r, n, s, o, c, i) {
        var l = 18;
        "(" == e.charAt(0) && ")" == e.charAt(e.length - 1) && (e = e.slice(1, -1)), t || (e = "http://" + e);
        var m = a.replace(/www\./gi, ""),
            u = m + (n || "") + (s || "") + (o || "") + (c || "") + (i || "");
        return u.length > l && m.length < l && (u = u.slice(0, m.length + (l - m.length)) + "..."), '<a href="' + e + '" target="_blank">' + u.replace("webrtc-experiment.com/", "/").replace("rtcmulticonnection.org/", "/").replace("recordrtc.org/", "/") + "</a>"
    },
    urlRegex = /\(?\b(?:(http|https|ftp):\/\/)?((?:www.)?[a-zA-Z0-9\-\.]+[\.][a-zA-Z]{2,4})(?::(\d*))?(?=[\s\/,\.\)])([\/]{1}[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]\(\)]*))?([\#][^\s\n]*)?\)?/gi;
getCommonjs();