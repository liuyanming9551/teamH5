import styled from 'styled-components';
export const ActiveBtnBox = styled.div`

`
export const ActiveBtn = styled.div`
    width: 30px;
    height: 30px;
    position: fixed;
    left: 300px;
    top: 400px;
    border-radius: 50%;
    padding: 3px;
    box-shadow:1px 0px 12px 1px rgba(0, 184, 255, 0.62);
    background: rgb(0, 184, 255);
    span{
        display: inline-block;
        width: 100%;
        height: 100%;
        font-size: 18px;
        color: #fff;
        text-align: center;
        line-height: 23px;
    }
`
export const PkListItem = styled.div`
    display:flex;
    justify-content:space-around;
    align-item:center;
    font-size:14px;
    .initiate{
        width:70px;
        display:flex;
        flex-direction: column;
        justify-content:space-between;
        .initiateName{
            margin-bottom:10px
        }
    }
    .dateWrap{
        width:180px;
        display:flex;
        justify-content:space-around;
        align-items: center;
        .startDate{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .endDate{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }
    .receive{
        width:70px;
        display:flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content:space-between;
        .receiveName{
            margin-bottom:10px
        }
    }
`