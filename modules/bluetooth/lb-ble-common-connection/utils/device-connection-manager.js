let findTargetDeviceNeedConnectedFun = defaultFindTargetDeviceNeedConnectedFun;

function setMyFindTargetDeviceNeedConnectedFun({connectTargetFun}) {
    findTargetDeviceNeedConnectedFun = typeof connectTargetFun === 'function' ? connectTargetFun : defaultFindTargetDeviceNeedConnectedFun;
}

/**
 * 找到需要连接的蓝牙设备
 * 该接口可被子类重写
 * @param devices 一个周期内扫描到的蓝牙设备，周期时长是wx.startBlueToothDevicesDiscovery接口中指定的interval时长
 * @param targetDeviceName 目标设备名称，使用的String.prototype.includes()函数来处理的，所以不必是全称。
 * @returns {{targetDevice: null}|{targetDevice: *}}
 */
function defaultFindTargetDeviceNeedConnectedFun({devices, targetDeviceName}) {
    const tempFilterArray = [];
    for (let device of devices) {
        if (device.localName?.includes(targetDeviceName)) {
            // this._isConnectBindDevice = true;
            tempFilterArray.push(device);
        }
    }
    if (tempFilterArray.length) {
        const device = tempFilterArray.reduce((pre, cur) => {
            return pre.RSSI > cur.RSSI ? pre : cur;
        });
        return {targetDevice: device};
    }
    return {targetDevice: null};
}

export {setMyFindTargetDeviceNeedConnectedFun, findTargetDeviceNeedConnectedFun};
