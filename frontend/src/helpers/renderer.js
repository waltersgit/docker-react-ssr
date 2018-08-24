import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from '../client/components/Home';

export default () => {
    // server/index.js渲染第一次等同於給爬蟲閱讀，client.js又渲染一次的原因為此時js才會正式渲染瀏覽器，
    // 此時事件才能正確使用
    const content = renderToString(<Home />);

    return `
        <html>
            <body>
                <div id="root">
                    ${content}
                </div>
                <script src="bundle.js"></script>
            </body>
        </html>
    `;
}