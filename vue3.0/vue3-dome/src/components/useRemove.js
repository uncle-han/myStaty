export default function(studenInfo) {
    
    const removeInfo = (id) => {
        studenInfo.list = studenInfo.list.filter((item) => item.id !== id);
    };
    
    return {
        removeInfo
    }
}