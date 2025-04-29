// let APP_ID = "9d27ae4a0fc04a098eed53b751e21c15";

// let token = null;
// let uid = String(Math.floor(Math.random() * 10000));

// let client;
// let channel;

// let queryString = window.location.search;
// let urlParams = new URLSearchParams(queryString);
// let roomId = urlParams.get('room');

// if (!roomId) {
//     window.location = 'lobby.html';
// }

// let localStream;
// let remoteStream;
// let peerConnection;

// const servers = {
//     iceServers: [
//         {
//             urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
//         }
//     ]
// };

// let constraints = {
//     video: {
//         width: { ideal: 1280 },
//         height: { ideal: 720 }
//     },
//     audio: true
// };



// let init = async () => {
//     client = await AgoraRTM.createInstance(APP_ID);
//     await client.login({ uid, token });

//     channel = client.createChannel(roomId);
//     await channel.join();

//     channel.on('MemberJoined', handleUserJoined);
//     channel.on('MemberLeft', handleUserLeft);
//     client.on('MessageFromPeer', handleMessageFromPeer);

//     try {
//         localStream = await navigator.mediaDevices.getUserMedia(constraints);
//         document.getElementById('user-1').srcObject = localStream;
//     } catch (err) {
//         console.error('Failed to get media stream:', err);
//         alert('Camera or microphone access failed. Please check permissions.');
//     }
// };

// let fallbackToDefaultConstraints = async () => {
//     try {
//         let fallbackConstraints = { video: true, audio: true };
//         localStream = await navigator.mediaDevices.getUserMedia(fallbackConstraints);
//         document.getElementById('user-1').srcObject = localStream;
//     } catch (fallbackErr) {
//         console.error("Fallback failed too:", fallbackErr);
//         alert("Camera and mic access failed even with fallback settings.");
//     }
// };

// let handleUserLeft = (MemberId) => {
//     document.getElementById('user-2').style.display = 'none';
//     document.getElementById('user-1').classList.remove('smallFrame');
// };

// let handleMessageFromPeer = async (message, MemberId) => {
//     message = JSON.parse(message.text);

//     if (message.type === 'offer') {
//         createAnswer(MemberId, message.offer);
//     }

//     if (message.type === 'answer') {
//         addAnswer(message.answer);
//     }

//     if (message.type === 'candidate') {
//         if (peerConnection) {
//             peerConnection.addIceCandidate(message.candidate);
//         }
//     }
// };

// let handleUserJoined = async (MemberId) => {
//     console.log('A new user joined the channel:', MemberId);
//     createOffer(MemberId);
// };

// let createPeerConnection = async (MemberId) => {
//     peerConnection = new RTCPeerConnection(servers);

//     remoteStream = new MediaStream();
//     document.getElementById('user-2').srcObject = remoteStream;
//     document.getElementById('user-2').style.display = 'block';
//     document.getElementById('user-1').classList.add('smallFrame');

//     if (!localStream) {
//         localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         document.getElementById('user-1').srcObject = localStream;
//     }

//     localStream.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, localStream);
//     });

//     peerConnection.ontrack = (event) => {
//         event.streams[0].getTracks().forEach((track) => {
//             remoteStream.addTrack(track);
//         });
//     };

//     peerConnection.onicecandidate = async (event) => {
//         if (event.candidate) {
//             client.sendMessageToPeer({ text: JSON.stringify({ 'type': 'candidate', 'candidate': event.candidate }) }, MemberId);
//         }
//     };
// };

// let createOffer = async (MemberId) => {
//     await createPeerConnection(MemberId);

//     let offer = await peerConnection.createOffer();
//     await peerConnection.setLocalDescription(offer);

//     client.sendMessageToPeer({ text: JSON.stringify({ 'type': 'offer', 'offer': offer }) }, MemberId);
// };

// let createAnswer = async (MemberId, offer) => {
//     await createPeerConnection(MemberId);

//     await peerConnection.setRemoteDescription(offer);

//     let answer = await peerConnection.createAnswer();
//     await peerConnection.setLocalDescription(answer);

//     client.sendMessageToPeer({ text: JSON.stringify({ 'type': 'answer', 'answer': answer }) }, MemberId);
// };

// let addAnswer = async (answer) => {
//     if (!peerConnection.currentRemoteDescription) {
//         peerConnection.setRemoteDescription(answer);
//     }
// };

// let leaveChannel = async () => {
//     await channel.leave();
//     await client.logout();
// };

// let toggleCamera = async () => {
//     let videoTrack = localStream.getTracks().find(track => track.kind === 'video');

//     if (videoTrack.enabled) {
//         videoTrack.enabled = false;
//         document.getElementById('camera-btn').style.backgroundColor = 'rgb(255, 80, 80)';
//     } else {
//         videoTrack.enabled = true;
//         document.getElementById('camera-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)';
//     }
// };

// let toggleMic = async () => {
//     let audioTrack = localStream.getTracks().find(track => track.kind === 'audio');

//     if (audioTrack.enabled) {
//         audioTrack.enabled = false;
//         document.getElementById('mic-btn').style.backgroundColor = 'rgb(255, 80, 80)';
//     } else {
//         audioTrack.enabled = true;
//         document.getElementById('mic-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)';
//     }
// };
// window.addEventListener('DOMContentLoaded', (event) => {
//     document.getElementById('camera-btn').addEventListener('click', toggleCamera);
//     document.getElementById('mic-btn').addEventListener('click', toggleMic);
// });

// init();

// document.getElementById('share-btn').addEventListener('click', () => {
//     const url = window.location.href; 
    
//     navigator.clipboard.writeText(url).then(() => {
//         alert('URL copied to clipboard!');
//     }).catch((err) => {
//         console.error('Error copying URL:', err);
//     });
// });
let APP_ID = "9d27ae4a0fc04a098eed53b751e21c15";
let token = null;
let uid = String(Math.floor(Math.random() * 10000));

let client, channel, localStream, remoteStream, peerConnection;

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let roomId = urlParams.get('room');

if (!roomId) {
    window.location = 'lobby.html';
}

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
    ]
};

let constraints = {
    video: {
        width: { ideal: 1280 },
        height: { ideal: 720 }
    },
    audio: true
};

let init = async () => {
    client = await AgoraRTM.createInstance(APP_ID);
    await client.login({ uid, token });

    client.on('ConnectionStateChanged', (state, reason) => {
        console.log(`RTM connection state changed: ${state}, Reason: ${reason}`);
    });

    channel = client.createChannel(roomId);
    await channel.join();

    channel.on('MemberJoined', handleUserJoined);
    channel.on('MemberLeft', handleUserLeft);
    client.on('MessageFromPeer', handleMessageFromPeer);

    try {
        localStream = await navigator.mediaDevices.getUserMedia(constraints);
        document.getElementById('user-1').srcObject = localStream;

        // Track ended detection
        localStream.getTracks().forEach(track => {
            track.onended = () => {
                console.warn(`Track ${track.kind} has ended.`);
            };
        });

    } catch (err) {
        console.error('Primary media stream failed:', err);
        await fallbackToDefaultConstraints();
    }
};

let fallbackToDefaultConstraints = async () => {
    try {
        let fallbackConstraints = { video: true, audio: true };
        localStream = await navigator.mediaDevices.getUserMedia(fallbackConstraints);
        document.getElementById('user-1').srcObject = localStream;
    } catch (fallbackErr) {
        console.error("Fallback media stream failed:", fallbackErr);
        alert("Camera and microphone access failed. Please check your permissions.");
    }
};

let handleUserLeft = (MemberId) => {
    console.log(`User left: ${MemberId}`);
    document.getElementById('user-2').style.display = 'none';
    document.getElementById('user-1').classList.remove('smallFrame');
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }
};

let handleMessageFromPeer = async (message, MemberId) => {
    message = JSON.parse(message.text);

    if (message.type === 'offer') {
        console.log('Received offer');
        createAnswer(MemberId, message.offer);
    }

    if (message.type === 'answer') {
        console.log('Received answer');
        addAnswer(message.answer);
    }

    if (message.type === 'candidate') {
        console.log('Received ICE candidate');
        if (peerConnection) {
            await peerConnection.addIceCandidate(message.candidate);
        }
    }
};

let handleUserJoined = async (MemberId) => {
    console.log('A new user joined the channel:', MemberId);
    createOffer(MemberId);
};

let createPeerConnection = async (MemberId) => {
    console.log('Creating peer connection with:', MemberId);

    peerConnection = new RTCPeerConnection(servers);

    remoteStream = new MediaStream();
    document.getElementById('user-2').srcObject = remoteStream;
    document.getElementById('user-2').style.display = 'block';
    document.getElementById('user-1').classList.add('smallFrame');

    if (!localStream) {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        document.getElementById('user-1').srcObject = localStream;
    }

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
        console.log('Received remote track');
        event.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track);
        });
    };

    peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
            console.log('Sending ICE candidate');
            client.sendMessageToPeer({ text: JSON.stringify({ type: 'candidate', candidate: event.candidate }) }, MemberId);
        }
    };

    peerConnection.oniceconnectionstatechange = () => {
        console.log('ICE connection state:', peerConnection.iceConnectionState);
        if (peerConnection.iceConnectionState === 'failed' || peerConnection.iceConnectionState === 'disconnected') {
            console.warn('ICE connection failed or disconnected. Closing connection.');
            peerConnection.close();
            peerConnection = null;
        }
    };
};

let createOffer = async (MemberId) => {
    await createPeerConnection(MemberId);

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    client.sendMessageToPeer({ text: JSON.stringify({ type: 'offer', offer }) }, MemberId);
};

let createAnswer = async (MemberId, offer) => {
    await createPeerConnection(MemberId);

    await peerConnection.setRemoteDescription(offer);

    let answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    client.sendMessageToPeer({ text: JSON.stringify({ type: 'answer', answer }) }, MemberId);
};

let addAnswer = async (answer) => {
    if (!peerConnection.currentRemoteDescription) {
        await peerConnection.setRemoteDescription(answer);
    }
};

let leaveChannel = async () => {
    if (peerConnection) {
        peerConnection.close();
    }
    await channel.leave();
    await client.logout();
};

let toggleCamera = async () => {
    let videoTrack = localStream.getTracks().find(track => track.kind === 'video');

    if (videoTrack.enabled) {
        videoTrack.enabled = false;
        document.getElementById('camera-btn').style.backgroundColor = 'rgb(255, 80, 80)';
    } else {
        videoTrack.enabled = true;
        document.getElementById('camera-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)';
    }
};

let toggleMic = async () => {
    let audioTrack = localStream.getTracks().find(track => track.kind === 'audio');

    if (audioTrack.enabled) {
        audioTrack.enabled = false;
        document.getElementById('mic-btn').style.backgroundColor = 'rgb(255, 80, 80)';
    } else {
        audioTrack.enabled = true;
        document.getElementById('mic-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)';
    }
};

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('camera-btn').addEventListener('click', toggleCamera);
    document.getElementById('mic-btn').addEventListener('click', toggleMic);
    document.getElementById('share-btn').addEventListener('click', () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('URL copied to clipboard!');
        }).catch((err) => {
            console.error('Error copying URL:', err);
        });
    });

    init();
});
