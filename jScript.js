function hide_textboxes() {
  document.getElementById("textboxes").style.transform = "scale(0,0)";
  document.getElementsByClassName("textboxes_shrink")[0].style.transform = "scale(0,0)";
  document.getElementsByClassName("textboxes_expand")[0].style.transform = "scale(1,1)";
  document.getElementsByTagName("iframe")[0].style.top = "0";
  document.getElementsByTagName("iframe")[0].style.height = "100%";
}

function show_textboxes() {
  document.getElementById("textboxes").style.transform = "scale(1,1)";
  document.getElementsByClassName("textboxes_shrink")[0].style.transform = "scale(1,1)";
  document.getElementsByClassName("textboxes_expand")[0].style.transform = "scale(0,0)";
  document.getElementsByTagName("iframe")[0].style.top = "41%";
  document.getElementsByTagName("iframe")[0].style.height = "58%";
}

$(document).ready(function() {
  $('.tools_slider').click(function() {
    if($("#tools").css("transform") == "matrix(0, 0, 0, 1, 0, 0)") {
      $('#tools').css("transform", "scaleX(1)");
      $(this).css("right", "20.7%");
      $(this).html("<i class='fas fa-angle-double-right'></i>");
    }
    else {
      $('#tools').css("transform", "scaleX(0)");
      $('.tools_slider').css("right", "0");
      $('.tools_slider').html("<i class='fas fa-angle-double-left'></i>");
    }
  });
});

/* Return the HTML string for the page */
function getHTML(data) {
  // Generate an HTML page from the contents of each <textarea>
  var pageData =
    `
    <!DOCTYPE html>
    <head>
    <style>
    ${data["css"]}
    </style>
    <script type="text/javascript">
    ${data["js"]}` +
    `</scr` + `ipt>` +      // This has to be broken up because otherwise it is recognized as the main document's end script tag
    `</head>
    <body>
    ${data["html"]}
    </body>
    `;

  return pageData;
}

/* Return a link to view the page */
function getViewLink(pageData) {
  return `http://devansh5398.github.io/Realtime-Webpage/#${window.btoa(pageData)}`;
}

/* Set the TinyUrl form hidden 'url' field to the view URL */
function getShortUrl() {
  var data = {
    "css" : document.getElementById("css").value,
    "js" : document.getElementById("javascript").value,
    "html" : document.getElementById("html").value
  };

  var html = encodeURIComponent(getHTML(data));

	// Update the URL for the "Short Link" button
  document.getElementById("url").value = getViewLink(html);
  document.forms[0].submit();
}

/* Show a prompt with the HTML page data so the user can copy the code */
function copyCode() {
  var data = {
    "css" : document.getElementById("css").value,
    "js" : document.getElementById("javascript").value,
    "html" : document.getElementById("html").value
  };

  var html = getHTML(data);
  var temp = document.createElement("textarea");
  temp.setAttribute("contentEditable",false);
  temp.innerHTML = html;
  temp.setAttribute("onfocus", "document.execCommand('selectAll', false, null)");
  document.body.appendChild(temp);
  temp.focus();
  document.execCommand("copy");
  document.body.removeChild(temp);
  alert("Code generated copied to clipboard.");
}

/* Run once when the page is loaded */
function initialize() {
  if (window.location.hash) {                   // Get page data from the URL and load it into the boxes
    var b64  = window.location.hash.slice(1);
    var json = window.atob(b64);
    var data = JSON.parse(json);

    document.getElementById("css").value = data["css"];
    document.getElementById("javascript").value = data["js"];
    document.getElementById("html").value = data["html"];
  }

  update();
}

/* Run each time a key is pressed on a text box */
function update() {
  var data = {
    "css" : document.getElementById("css").value,
    "js" : document.getElementById("javascript").value,
    "html" : document.getElementById("html").value
  };

  window.location.hash = "#" + window.btoa(JSON.stringify(data));     // Save encoded page data to the URL

  var html = encodeURIComponent(getHTML(data));
  document.getElementById("link2").href = getViewLink(html);    // Update the URL for the "Get Link" button
  document.getElementById("link4").href = `data:text/html,${html}`;    // Update the download link
  window.frames[0].location.replace(`data:text/html,${html}`);        // Update the <iframe> to display the generated page
}
