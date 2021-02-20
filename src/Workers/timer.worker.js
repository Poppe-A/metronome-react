/* eslint-disable no-restricted-globals */
export default () => {
    self.onmessage = ({data}) => {
        switch(data) {
            case 'start':
                postMessage('OK');
                return;
            case 'stop':
                postMessage('Stop');
                return;
            default :
                postMessage('Patronus');
        }
    }
}
