
function bootstrap() {
  const iframeTarget = document.querySelector('#iframe-target');
  const msgChannels = [{
    id: 'msgChannel-01',
    channel: new MessageChannel()
  }, {
    id: 'msgChannel-02',
    channel: new MessageChannel()
  }, {
    id: 'msgChannel-03',
    channel: new MessageChannel()
  }, {
    id: 'msgChannel-04',
    channel: new MessageChannel()
  }];

  for (const {id, channel} of msgChannels) {
    // Attach message handler on port1 of the MessageChannel.
    // port2 will be sent to the iframe.
    channel.port1.onmessage = (e) => {
      // Invoked when the iframe messages back, on the MessagePort objects.
      console.log(`expecting ${id}, received ${e.data}`);
      populateResult(id, e.data);
    };
  }

  iframeTarget.onload = () => {
    // `channels` is an array of "Channel IDs"
    // `tranfer` is an array of MessagePort objects
    const channels = msgChannels.map(item => item.id);
    const transfer = msgChannels.map(item => item.channel.port2);
    
    // `channels` gets passed via e.data, so the receiver can tell the order that
    // the transfer objects were sent in.
    iframeTarget.contentWindow.postMessage(
        { channels },
        'http://localhost:8011',
        transfer);
  };
}

function populateResult(actual, received) {
  const table = document.querySelector('#results');
  const row = document.createElement('tr');
  const actualCol = document.createElement('td');
  const receivedCol = document.createElement('td');

  actualCol.textContent = actual;
  receivedCol.textContent = received;

  row.append(receivedCol, actualCol);
  table.append(row);
}
