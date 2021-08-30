
window.addEventListener('message', function postMessageHandler(e) {
  // Interates over the `channels` array, that was passed from the main page.
  // That array describes the order the transfer objects were sent in, so we use the index
  // to try and access that MessagePort object, and send a message back to the parent with
  // what we received.
  e.data.channels.forEach((channelId, index) => {
    e.ports[index].postMessage(channelId);
  });
});
