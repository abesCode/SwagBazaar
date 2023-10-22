import request from "requestV2"
export function send(content, url) {
    request({
        url:url,
        method:"POST",
        headers:{
            'Content-type': 'application/json',
            "User-agent":"Mozilla/5.0"
        },
        body:{
            content: content,
        }
    });
}
