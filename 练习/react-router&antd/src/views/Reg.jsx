import React from "react";
import { createFromIconfontCN } from '@ant-design/icons';

export default function Reg() {
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_2227148_pg39v5ie2h.js',
    });

    return (<div style={{ backgroundColor: "palevioletred" }}>Reg
        <h3>
            iconFont图标测试
            <IconFont type="icon-shouhuodizhi" />
            <IconFont type="icon-kefu" />
            <IconFont type="icon-shoucang-active" />
        </h3>
    </div>)
}