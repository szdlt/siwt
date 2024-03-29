/*  2019.0603.14:23
modified from duncan
load dependency
"siwt": "file:../pxt-siwt"
*/
//% color="#C814B8" weight=25 icon="\uf1d4"
namespace siwt_显示类 {
    let lhRGBLight: QbitRGBLight.LHQbitRGBLight;
    //% blockId="initRGBLight" block="initRGBLight before use"
    //% weight=94
    export function initRGBLight() {
        if (!lhRGBLight) {
            lhRGBLight = QbitRGBLight.create(DigitalPin.P16, 4, QbitRGBPixelMode.RGB);	
        }
        clearLight();
    }
    //% blockId=siwt_SevenColorLED block="SevenColorLED|%uartData"
    //% weight=93
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function SevenColorLED(uartData: string) {
        if (uartData == "*CL01") {
            setPixelRGB(Lights.Light1, QbitRGBColors.Red)
            setPixelRGB(Lights.Light2, QbitRGBColors.Red)
            showLight()
        } else if (uartData == "*CL02") {
            setPixelRGB(Lights.Light1, QbitRGBColors.Orange)
            setPixelRGB(Lights.Light2, QbitRGBColors.Orange)
            showLight()
        } else if (uartData == "*CL03") {
            setPixelRGB(Lights.Light1, QbitRGBColors.Yellow)
            setPixelRGB(Lights.Light2, QbitRGBColors.Yellow)
            showLight()
        } else if (uartData == "*CL04") {
            setPixelRGB(Lights.Light1, QbitRGBColors.Green)
            setPixelRGB(Lights.Light2, QbitRGBColors.Green)
            showLight()
        } else if (uartData == "*CL05") {
            setPixelRGB(Lights.Light1, QbitRGBColors.Indigo)
            setPixelRGB(Lights.Light2, QbitRGBColors.Indigo)
            showLight()
        } else if (uartData == "*CL06") {
            setPixelRGB(Lights.Light1, QbitRGBColors.Blue)
            setPixelRGB(Lights.Light2, QbitRGBColors.Blue)
            showLight()
        } else if (uartData == "*CL07") {
            setPixelRGB(Lights.Light1, QbitRGBColors.Violet)
            setPixelRGB(Lights.Light2, QbitRGBColors.Violet)
            showLight()
        }
	  else if (uartData == "*CL21") {
            setPixelRGB(Lights.Light1, QbitRGBColors.White)
            setPixelRGB(Lights.Light2, QbitRGBColors.White)
            showLight()
        }
	  else if (uartData == "*CL20") {
           clearLight()
        }   
    }
    //% blockId="setBrightness" block="set brightness %brightness"
    //% brightness.min=0 brightness.max=255
    //% weight=92
    export function setBrightness(brightness: number): void {
        lhRGBLight.setBrightness(brightness);
    }
	/**
     * Set the color of the colored lights, after finished the setting please perform  the display of colored lights.
     */
    //% weight=91 blockId=setPixelRGB block="Set|%lightoffset|color to %rgb"
    export function setPixelRGB(lightoffset: Lights, rgb: QbitRGBColors) {
        lhRGBLight.setPixelColor(lightoffset, rgb, false);
    }
    /**
    * Set RGB Color argument
    */
    //% weight=90 blockId=setPixelRGBArgs block="Set|%lightoffset|color to %rgb"
    export function setPixelRGBArgs(lightoffset: Lights, rgb: number) {
        lhRGBLight.setPixelColor(lightoffset, rgb, false);
    }
	/**
     * Display the colored lights, and set the color of the colored lights to match the use. After setting the color of the colored lights, the color of the lights must be displayed.
     */
    //% weight=88 blockId=showLight block="Show light"
    export function showLight() {
        lhRGBLight.show();
    }
    /**
     * Clear the color of the colored lights and turn off the lights.
     */
    //% weight=86 blockGap=50 blockId=clearLight block="Clear light"
    export function clearLight() {
        lhRGBLight.clear();
    }
}

//% color="#87CEEB" weight=24 icon="\uf1b6"
namespace siwt_传感器类 {
    export enum enVoice {
        //% blockId="Voice" block="有声音"
        Voice = 0,
        //% blockId="NoVoice" block="无声音"
        NoVoice = 1
    }
    export enum enIR {
        //% blockId="Get" block="检测到"
        Get = 0,
        //% blockId="NoVoice" block="未检测到"
        NoGet = 1
    }
    export enum enOK {
        //% blockId="NotOK" block="异常"
        NotOK = 0,
        //% blockId="OK" block="正常"
        OK = 1
    }
    export enum Colors {
        //% blockId="Red" block="红色"
        Red = 0x01,
        //% blockId="Green" block="绿色"
        Green = 0x02,
        //% blockId="Blue" block="蓝色"
        Blue = 0x03,
        //% blockId="White" block="白色"
        White = 0x04,
        //% blockId="Black" block="黑色"
        Black = 0x05
    }
    const APDS9960_I2C_ADDR = 0x39;
    const APDS9960_ID_1 = 0xA8;
    const APDS9960_ID_2 = 0x9C;
    /* APDS-9960 register addresses */
    const APDS9960_ENABLE = 0x80;
    const APDS9960_ATIME = 0x81;
    const APDS9960_WTIME = 0x83;
    const APDS9960_AILTL = 0x84;
    const APDS9960_AILTH = 0x85;
    const APDS9960_AIHTL = 0x86;
    const APDS9960_AIHTH = 0x87;
    const APDS9960_PILT = 0x89;
    const APDS9960_PIHT = 0x8B;
    const APDS9960_PERS = 0x8C;
    const APDS9960_CONFIG1 = 0x8D;
    const APDS9960_PPULSE = 0x8E;
    const APDS9960_CONTROL = 0x8F;
    const APDS9960_CONFIG2 = 0x90;
    const APDS9960_ID = 0x92;
    const APDS9960_STATUS = 0x93;
    const APDS9960_CDATAL = 0x94;
    const APDS9960_CDATAH = 0x95;
    const APDS9960_RDATAL = 0x96;
    const APDS9960_RDATAH = 0x97;
    const APDS9960_GDATAL = 0x98;
    const APDS9960_GDATAH = 0x99;
    const APDS9960_BDATAL = 0x9A;
    const APDS9960_BDATAH = 0x9B;
    const APDS9960_PDATA = 0x9C;
    const APDS9960_POFFSET_UR = 0x9D;
    const APDS9960_POFFSET_DL = 0x9E;
    const APDS9960_CONFIG3 = 0x9F;
    const LED_DRIVE_100MA = 0;
    const LED_DRIVE_50MA = 1;
    const LED_DRIVE_25MA = 2;
    const LED_DRIVE_12_5MA = 3;
    /* ALS Gain (AGAIN) values */
    const AGAIN_1X = 0;
    const AGAIN_4X = 1;
    const AGAIN_16X = 2;
    const AGAIN_64X = 3;
    /* Default values */
    const DEFAULT_ATIME = 219;    // 103ms
    const DEFAULT_WTIME = 246;    // 27ms
    const DEFAULT_PROX_PPULSE = 0x87;    // 16us, 8 pulses
    const DEFAULT_GESTURE_PPULSE = 0x89;    // 16us, 10 pulses
    const DEFAULT_POFFSET_UR = 0;       // 0 offset
    const DEFAULT_POFFSET_DL = 0;       // 0 offset      
    const DEFAULT_CONFIG1 = 0x60;    // No 12x wait (WTIME) factor
    const DEFAULT_PILT = 0;       // Low proximity threshold
    const DEFAULT_PIHT = 50;      // High proximity threshold
    const DEFAULT_AILT = 0xFFFF;  // Force interrupt for calibration
    const DEFAULT_AIHT = 0;
    const DEFAULT_PERS = 0x11;    // 2 consecutive prox or ALS for int.
    const DEFAULT_CONFIG2 = 0x01;    // No saturation interrupts or LED boost  
    const DEFAULT_CONFIG3 = 0;       // Enable all photodiodes, no SAI
    const DEFAULT_GPENTH = 40;      // Threshold for entering gesture mode
    const DEFAULT_GEXTH = 30;      // Threshold for exiting gesture mode    
    const DEFAULT_GCONF1 = 0x40;    // 4 gesture events for int., 1 for exit
    const DEFAULT_GOFFSET = 0;       // No offset scaling for gesture mode
    const DEFAULT_GPULSE = 0xC9;    // 32us, 10 pulses
    const DEFAULT_GCONF3 = 0;       // All photodiodes active during gesture
    const DEFAULT_GIEN = 0;       // Disable gesture interrupts
    const DEFAULT_LDRIVE = LED_DRIVE_100MA;
    const DEFAULT_AGAIN = AGAIN_4X;
    const OFF = 0;
    const ON = 1;
    const POWER = 0;
    const AMBIENT_LIGHT = 1;
    const PROXIMITY = 2;
    const WAIT = 3;
    const AMBIENT_LIGHT_INT = 4;
    const PROXIMITY_INT = 5;
    const GESTURE = 6;
    const ALL = 7;
	
    function i2cwrite(reg: number, value: number) {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = value;
        pins.i2cWriteBuffer(APDS9960_I2C_ADDR, buf);
    }
    function i2cread(reg: number): number {
        pins.i2cWriteNumber(APDS9960_I2C_ADDR, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(APDS9960_I2C_ADDR, NumberFormat.UInt8BE);
        return val;
    }
    function InitColor(): boolean {
        let id = i2cread(APDS9960_ID);
        //  serial.writeLine("id:")
        //  serial.writeNumber(id); 
        if (!(id == APDS9960_ID_1 || id == APDS9960_ID_2)) {
            return false;
        }
        //  serial.writeLine("set mode:")
        setMode(ALL, OFF);
        i2cwrite(APDS9960_ATIME, DEFAULT_ATIME);
        i2cwrite(APDS9960_WTIME, DEFAULT_WTIME);
        i2cwrite(APDS9960_PPULSE, DEFAULT_PROX_PPULSE);
        i2cwrite(APDS9960_POFFSET_UR, DEFAULT_POFFSET_UR);
        i2cwrite(APDS9960_POFFSET_DL, DEFAULT_POFFSET_DL);
        i2cwrite(APDS9960_CONFIG1, DEFAULT_CONFIG1);
        setLEDDrive(DEFAULT_LDRIVE);
        setAmbientLightGain(DEFAULT_AGAIN);
        setLightIntLowThreshold(DEFAULT_AILT);
        setLightIntHighThreshold(DEFAULT_AIHT);
        i2cwrite(APDS9960_PERS, DEFAULT_PERS);
        i2cwrite(APDS9960_CONFIG2, DEFAULT_CONFIG2);
        i2cwrite(APDS9960_CONFIG3, DEFAULT_CONFIG3);
        return true;
    }
    function setMode(mode: number, enable: number) {
        let reg_val = getMode();
        /* Change bit(s) in ENABLE register */
        enable = enable & 0x01;
        if (mode >= 0 && mode <= 6) {
            if (enable > 0) {
                reg_val |= (1 << mode);
            }
            else {
                //reg_val &= ~(1 << mode);
                reg_val &= (0xff - (1 << mode));
            }
        }
        else if (mode == ALL) {
            if (enable > 0) {
                reg_val = 0x7F;
            }
            else {
                reg_val = 0x00;
            }
        }
        i2cwrite(APDS9960_ENABLE, reg_val);
    }
    function getMode(): number {
        let enable_value = i2cread(APDS9960_ENABLE);
        return enable_value;
    }
    function setLEDDrive(drive: number) {
        let val = i2cread(APDS9960_CONTROL);
        /* Set bits in register to given value */
        drive &= 0b00000011;
        drive = drive << 6;
        val &= 0b00111111;
        val |= drive;
        i2cwrite(APDS9960_CONTROL, val);
    }
    function setLightIntLowThreshold(threshold: number) {
        let val_low = threshold & 0x00FF;
        let val_high = (threshold & 0xFF00) >> 8;
        i2cwrite(APDS9960_AILTL, val_low);
        i2cwrite(APDS9960_AILTH, val_high);
    }
    function setLightIntHighThreshold(threshold: number) {
        let val_low = threshold & 0x00FF;
        let val_high = (threshold & 0xFF00) >> 8;
        i2cwrite(APDS9960_AIHTL, val_low);
        i2cwrite(APDS9960_AIHTH, val_high);
    }
    function enableLightSensor(interrupts: boolean) {
        setAmbientLightGain(DEFAULT_AGAIN);
        if (interrupts) {
            setAmbientLightIntEnable(1);
        }
        else {
            setAmbientLightIntEnable(0);
        }
        enablePower();
        setMode(AMBIENT_LIGHT, 1);
    }
    function setAmbientLightGain(drive: number) {
        let val = i2cread(APDS9960_CONTROL);
        /* Set bits in register to given value */
        drive &= 0b00000011;
        val &= 0b11111100;
        val |= drive;
        i2cwrite(APDS9960_CONTROL, val);
    }
    function getAmbientLightGain(): number {
        let val = i2cread(APDS9960_CONTROL);
        val &= 0b00000011;
        return val;
    }
    function enablePower() {
        setMode(POWER, 1);
    }
    function setAmbientLightIntEnable(enable: number) {
        let val = i2cread(APDS9960_ENABLE);
        /* Set bits in register to given value */
        enable &= 0b00000001;
        enable = enable << 4;
        val &= 0b11101111;
        val |= enable;
        i2cwrite(APDS9960_ENABLE, val);
    }
    function readAmbientLight(): number {
        let val_byte = i2cread(APDS9960_CDATAL);
        let val = val_byte;
        val_byte = i2cread(APDS9960_CDATAH);
        val = val + val_byte << 8;
        return val;
    }
    function readRedLight(): number {
        let val_byte = i2cread(APDS9960_RDATAL);
        let val = val_byte;
        val_byte = i2cread(APDS9960_RDATAH);
        val = val + val_byte << 8;
        return val;
    }
    function readGreenLight(): number {
        let val_byte = i2cread(APDS9960_GDATAL);
        let val = val_byte;
        val_byte = i2cread(APDS9960_GDATAH);
        val = val + val_byte << 8;
        return val;
    }
    function readBlueLight(): number {
        let val_byte = i2cread(APDS9960_BDATAL);
        let val = val_byte;
        val_byte = i2cread(APDS9960_BDATAH);
        val = val + val_byte << 8;
        return val;
    }
    //% blockId=siwt_initColorSensor block="initColorSensor|value %value"
    //% weight=95
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function initColorSensor() {
        InitColor();
        enableLightSensor(false);
        control.waitMicros(100);
    }
    /*
 *  Color sensor to obtain color value.
 */
    //% weight=84 blockId=siwt_checkCurrentColor block="checkCurrentColor|color %color" 
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function checkCurrentColor(color: Colors): boolean {
        //       setBrightness(150);     
        //       setPixelRGB(Lights.Light1, DlbitRGBColors.White);
        //       setPixelRGB(Lights.Light2, DlbitRGBColors.White);
        //       showLight(); 
        let r = readRedLight();
        let g = readGreenLight();
        let b = readBlueLight();
        let t = Colors.Red;
        if (r > g) {
            t = Colors.Red;
        }
        else {
            t = Colors.Green;
        }
        if (t == Colors.Green && g < b) {
            if (b - g > 1000)
                t = Colors.Blue;
        }
        if (t == Colors.Red && r < b) {
            t = Colors.Blue;
        }
        //          serial.writeNumber(r); 
        //          serial.writeLine("->red");
        //          serial.writeNumber(g); 
        //          serial.writeLine("->green"); 
        //          serial.writeNumber(b); 
        //          serial.writeLine("->blue"); 

        if (r > 6800 && g > 8000 && b > 12000) {
            t = Colors.White;
        }
        else if (r < 800 && g < 1100 && b < 1300) {
            t = Colors.Black;
        }
        else if (t == Colors.Blue && b > 2800) {
            //        serial.writeLine("blue");
        }
        else if (t == Colors.Green && g > 1500) {
            // serial.writeLine("green");
        }
        else if (t == Colors.Red && r > 3000) {
            //serial.writeLine("red");
        }
        else {
            //serial.writeLine("none");
            return false;
        }
        return (color == t);
    }
    //% blockId=siwt_Voice_Sensor block="Voice_Sensor|value %value|声音"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Voice_Sensor(value: enVoice): boolean {
        pins.setPull(DigitalPin.P3, PinPullMode.PullUp);
        if (pins.digitalReadPin(DigitalPin.P3) == value) {
            return true;
        }
        else {
            return false;
        }
    }
    //% blockId=siwt_Incline_Sensor block="Incline_Sensor|%value|倾斜"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Incline_Sensor(value: enIR): boolean {
        pins.setPull(DigitalPin.P9, PinPullMode.PullUp);
        //IR_send_38k();
        if (pins.digitalReadPin(DigitalPin.P9) == value) {
            return true;
        }
        else {
            return false;
        }
    }
    //% blockId=siwt_Smog_Sensor block="Smog_Sensor|%value|烟雾"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Smog_Sensor(value: enIR): boolean {
        pins.setPull(DigitalPin.P3, PinPullMode.PullUp);
        if (pins.digitalReadPin(DigitalPin.P3) == value) {
            return true;
        }
        else {
            return false;
        }
    }
    //% blockId=siwt_Humidity_Sensor block="Humidity_Sensor|土壤湿度|%value"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Humidity_Sensor(value: enOK): boolean {
        pins.setPull(DigitalPin.P3, PinPullMode.PullUp);
        if (pins.digitalReadPin(DigitalPin.P3) == value) {
            return false;
        }
        else {
            return true;
        }
    }
    //% blockId=siwt_Touch_Sensor block="Touch_Sensor|%value|触摸"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Touch_Sensor(value: enIR): boolean {
        pins.setPull(DigitalPin.P9, PinPullMode.PullUp);
        if (pins.digitalReadPin(DigitalPin.P9) == value) {
            return false;
        }
        else {
            return true;
        }
    }
    //% blockId=siwt_Photosensitive_Sensor block="Photosensitive_Sensor|%value|光照"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Photosensitive_Sensor(value: enIR): boolean {

        pins.setPull(DigitalPin.P8, PinPullMode.PullUp);
        if (pins.digitalReadPin(DigitalPin.P8) == value) {
            return true;
        }
        else {
            return false;
        }
    }
    //% blockId=siwt_Flame_Sensor block="Flame_Sensor|%value|火焰"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Flame_Sensor(value: enIR): boolean {
        pins.setPull(DigitalPin.P8, PinPullMode.PullUp);
        if (pins.digitalReadPin(DigitalPin.P8) == value) {
            return true;
        }
        else {
            return false;
        }
    }
    function IR_send_38k() {
        for (let i: number = 0; i < 8; i++) {
            pins.digitalWritePin(DigitalPin.P9, 1);
            control.waitMicros(13);
            pins.digitalWritePin(DigitalPin.P9, 0);
            control.waitMicros(13);
        }
    }
    //% blockId=siwt_IR_Sensor block="IR_Sensor|%value|障碍物"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    function IR_Sensor(pin: DigitalPin, value: enIR): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        //IR_send_38k();
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }
    }
    //% blockId=siwt_IR_Send block="IR_Send|pin %pin"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    function IR_Send(pin: DigitalPin): void {
        IR_send_38k();
    }
}

/*****************************************************************************************************************************************
 *    音乐类 *****************************************************************************************************************************
 ****************************************************************************************************************************************/

//% color="#D2691E" weight=22 icon="\uf001"
namespace siwt_音乐类 {
    export enum enBuzzer {
        //% blockId="NoBeep" block="不响"
        NoBeep = 0,
        //% blockId="Beep" block="响"
        Beep
    }
    //% blockId=siwt_BluetoothMusic block="BluetoothMusic|%uartData"
    //% weight=92
    //% blockGap=10
    //% color="#D2691E"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function BluetoothMusic(uartData: string): void {
        if (uartData == "*C1") {
            music.ringTone(262)
        }
        else if (uartData == "*C2") {
            music.ringTone(311)
        }
        else if (uartData == "*C3") {
            music.ringTone(440)
        }
        else if (uartData == "*C4") {
            music.ringTone(175)
        }
        else if (uartData == "*C5") {
            music.ringTone(622)
        }
        else if (uartData == "*C6") {
            music.ringTone(784)
        }
        else if (uartData == "*C7") {
            music.ringTone(932)
        }
        else if (uartData == "*C0") {
            pins.digitalWritePin(DigitalPin.P0, 0)
        }
	else if (uartData == "*C8") {
           music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
        }
    }
    //% blockId=siwt_Buzzer block="关闭蜂鸣器"
    //% weight=100
    //% blockGap=10 
    //% color="#D2691E"
    //% value.min=0 value.max=1
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=8
    export function Buzzer(): void {
        pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P0, 0);
    }
}

/*****************************************************************************************************************************************
 *    电机类 *****************************************************************************************************************************
 ****************************************************************************************************************************************/

//% color="#0000CD" weight=21 icon="\uf185"

namespace siwt_电机类 {
    //% blockId=siwt_Vibrator_Open block="Vibrator_Open"
    //% weight=100
    //% blockGap=10
    //% color="#0000CD"
    //% value.min=0 value.max=1023
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Vibrator_Open(): void {
        pins.digitalWritePin(DigitalPin.P12, 1);
    }
    //% blockId=siwt_Vibrator_Close block="Vibrator_Close"
    //% weight=100
    //% blockGap=10
    //% color="#0000CD"
    //% value.min=0 value.max=1023
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Vibrator_Close(): void {
        pins.digitalWritePin(DigitalPin.P12, 0);
    }
}

//% color="#006400" weight=20 icon="\uf1b9"
namespace siwt_小车类 {
    const PCA9685_ADD = 0x41
    const MODE1 = 0x00
    const MODE2 = 0x01
    const SUBADR1 = 0x02
    const SUBADR2 = 0x03
    const SUBADR3 = 0x04
    const LED0_ON_L = 0x06
    const LED0_ON_H = 0x07
    const LED0_OFF_L = 0x08
    const LED0_OFF_H = 0x09
    const ALL_LED_ON_L = 0xFA
    const ALL_LED_ON_H = 0xFB
    const ALL_LED_OFF_L = 0xFC
    const ALL_LED_OFF_H = 0xFD
    const PRESCALE = 0xFE
    let initialized = false
    let g_mode = 0
    let value_past = 90
    export enum enMusic {
        dadadum = 0,
        entertainer,
        prelude,
        ode,
        nyan,
        ringtone,
        funk,
        blues,
        birthday,
        wedding,
        funereal,
        punchline,
        baddy,
        chase,
        ba_ding,
        wawawawaa,
        jump_up,
        jump_down,
        power_up,
        power_down
    }
    export enum enPos {
        //% blockId="LeftState" block="左边状态"
        LeftState = 0,
        //% blockId="RightState" block="右边状态"
        RightState = 1
    }
    export enum enLineState {
        //% blockId="White" block="白线"
        White = 0,
        //% blockId="Black" block="黑线"
        Black = 1
    }
    export enum enAvoidState {
        //% blockId="OBSTACLE" block="有障碍物"
        OBSTACLE = 0,
        //% blockId="NOOBSTACLE" block="无障碍物"
        NOOBSTACLE = 1
    }
    export enum enServo {
        S1 = 1,
        S2,
        S3,
        S4,
        S5,
        S6
    }
    export enum CarRunState {
        //% blockId="Car_Normal" block="正常"
        Car_Normal = 0,
        //% blockId="Car_XunJi" block="寻迹"
        Car_XunJi = 1,
        //% blockId="Car_BiZhang" block="避障"  
        Car_BiZhang = 2
    }
    export enum MotorNum {
        //% blockId="Motor0" block="电机1"
        Motor0 = 0,
        //% blockId="Motor1"  block="电机2"
        Motor1 = 1
    }
    export enum MotorDir {
        //% blockId="clockwise" block="正转"
        clockwise = 0,
        //% blockId="anticlockwise" block="反转"
        anticlockwise = 1
    }
    export enum CarState {
        //% blockId="Car_Run" block="前行"
        Car_Run = 1,
        //% blockId="Car_Back" block="后退"
        Car_Back = 2,
        //% blockId="Car_Left" block="左转"
        Car_Left = 3,
        //% blockId="Car_Right" block="右转"
        Car_Right = 4,
        //% blockId="Car_Stop" block="停止"
        Car_Stop = 5,
        //% blockId="Car_SpinLeft" block="原地左旋"
        Car_SpinLeft = 6,
        //% blockId="Car_SpinRight" block="原地右旋"
        Car_SpinRight = 7
    }
    //% blockId=siwt_BluetoothCarControl block="BluetoothCarControl|%uartData"
    //% weight=92
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function BluetoothCarControl(uartData: string): void {
        if (uartData == "*CB") {
            CarCtrl(CarState.Car_Run)
        } else if (uartData == "*CA") {
            CarCtrl(CarState.Car_Back)
        } else if (uartData == "*CC") {
            CarCtrl(CarState.Car_SpinLeft)
        } else if (uartData == "*CD") {
            CarCtrl(CarState.Car_SpinRight)
        } else if (uartData == "*CE") {
            CarCtrl(CarState.Car_Stop)
        } else if (uartData == "*CADD") {
            CarCtrl(CarState.Car_Stop)
        } else if (uartData == "*CSD") {
            CarCtrl(CarState.Car_Stop)
        }
    }
    //% blockId=siwt_BluetoothServoControl block="BluetoothServoControl|%uartData"
    //% weight=92
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function BluetoothServoControl(uartData: string): void {
        let servo1 = 0
        let servo2 = 0
        let servo3 = 0
        let servo4 = 0
        let servo6 = 0
        let servo5 = 0
        let index = 0
        if (uartData.indexOf("*1-") != -1) {
            index = uartData.indexOf("*1-");
            servo1 = parseInt(uartData.substr(3, uartData.length - 3))
            Servo_Car(enServo.S1, servo1 ,10)
        }
        else if (uartData.indexOf("*2-") != -1) {
            index = uartData.indexOf("*2-");
            servo2 = parseInt(uartData.substr(3, uartData.length - 3))
            Servo_Car(enServo.S2, servo2, 10)
        }
        else if (uartData.indexOf("*3-") != -1) {
            index = uartData.indexOf("*3-");
            servo3 = parseInt(uartData.substr(3, uartData.length - 3))
            Servo_Car(enServo.S3, servo3, 10)
        }
        else if (uartData.indexOf("*4-") != -1) {
            index = uartData.indexOf("*4-");
            servo4 = parseInt(uartData.substr(3, uartData.length - 3))
            Servo_Car(enServo.S4, servo4, 10)
        }
        else if (uartData.indexOf("*5-") != -1) {
            index = uartData.indexOf("*5-");
            servo5 = parseInt(uartData.substr(3, uartData.length - 3))
            Servo_Car(enServo.S5, servo5, 10)
        }
        else if (uartData.indexOf("*6-") != -1) {
            index = uartData.indexOf("*6-");
            servo6 = parseInt(uartData.substr(3, uartData.length - 3))
            Servo_Car(enServo.S6, servo6, 10)
        }
    }
    //% blockId=siwt_BluetoothModeSelect block="BluetoothModeSelect|%uartData"
    //% weight=92
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function BluetoothModeSelect(uartData: string): number {
        if (uartData == "*CM0") {
            g_mode = 1
            return CarRunState.Car_XunJi
        } else if (uartData == "*CM1") {
            g_mode = 2
            return CarRunState.Car_BiZhang
        } else if (uartData == "*CM9") {
            g_mode = 0
            return CarRunState.Car_Normal
        }
        else {
            g_mode = 0
            return CarRunState.Car_Normal
        }
    }
    function i2cwrite_(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }
    function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1)
        buf[0] = value
        pins.i2cWriteBuffer(addr, buf)
    }
    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }
    function initPCA9685(): void {
        i2cwrite_(PCA9685_ADD, MODE1, 0x00)
        setFreq(50);
        initialized = true
    }
    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADD, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite_(PCA9685_ADD, MODE1, newmode); // go to sleep
        i2cwrite_(PCA9685_ADD, PRESCALE, prescale); // set the prescaler
        i2cwrite_(PCA9685_ADD, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite_(PCA9685_ADD, MODE1, oldmode | 0xa1);
    }
    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;
        if (!initialized) {
            initPCA9685();
        }
        if (channel < 9 && channel > 5)
            channel += 3;
        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADD, buf);
    }
    function Car_run(speed: number) {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= 350) {
            speed = 350
        }
        setPwm(12, 0, speed);
        setPwm(13, 0, 0);
        setPwm(15, 0, speed);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P16, 1);
        // pins.analogWritePin(AnalogPin.P1, 1023-speed); //速度控制

        // pins.analogWritePin(AnalogPin.P0, speed);//速度控制
        // pins.digitalWritePin(DigitalPin.P8, 0);
    }
    function Car_back(speed: number) {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= 350 && speed != 0) {
            speed = 350
        }
        setPwm(12, 0, 0);
        setPwm(13, 0, speed);
        setPwm(15, 0, 0);
        setPwm(14, 0, speed);
        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.analogWritePin(AnalogPin.P1, speed); //速度控制
        //pins.analogWritePin(AnalogPin.P0, 1023 - speed);//速度控制
        //pins.digitalWritePin(DigitalPin.P8, 1);
    }
    function Car_left(speed: number) {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= 350 && speed != 0) {
            speed = 350
        }
        setPwm(12, 0, 0);
        setPwm(13, 0, 0);
        setPwm(15, 0, speed);
        setPwm(14, 0, 0);
        //pins.analogWritePin(AnalogPin.P0, speed);
        //pins.digitalWritePin(DigitalPin.P8, 0);
        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.digitalWritePin(DigitalPin.P1, 0);
    }
    function Car_right(speed: number) {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= 350 && speed != 0) {
            speed = 350
        }
        setPwm(12, 0, speed);
        setPwm(13, 0, 0);
        setPwm(15, 0, 0);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P0, 0);
        //pins.digitalWritePin(DigitalPin.P8, 0);
        //pins.digitalWritePin(DigitalPin.P16, 1);
        // pins.analogWritePin(AnalogPin.P1, 1023 - speed);
    }
    function Car_stop() {
        setPwm(12, 0, 0);
        setPwm(13, 0, 0);
        setPwm(15, 0, 0);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P0, 0);
        //pins.digitalWritePin(DigitalPin.P8, 0);
        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.digitalWritePin(DigitalPin.P1, 0);
    }
    function Car_spinleft(speed: number) {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= 350 && speed != 0) {
            speed = 350
        }
        setPwm(12, 0, 0);
        setPwm(13, 0, speed);
        setPwm(15, 0, speed);
        setPwm(14, 0, 0);
        //pins.analogWritePin(AnalogPin.P0, speed);
        //pins.digitalWritePin(DigitalPin.P8, 0);
        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.analogWritePin(AnalogPin.P1, speed);
    }
    function Car_spinright(speed: number) {
        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= 350 && speed != 0) {
            speed = 350
        }
        setPwm(12, 0, speed);
        setPwm(13, 0, 0);
        setPwm(15, 0, 0);
        setPwm(14, 0, speed);
        //pins.analogWritePin(AnalogPin.P0, 1023-speed);
        //pins.digitalWritePin(DigitalPin.P8, 1);
        //pins.digitalWritePin(DigitalPin.P16, 1);
        //pins.analogWritePin(AnalogPin.P1, 1023-speed);
    }
    //% blockId=siwt_ultrasonic_car block="ultrasonic return distance(cm)"
    //% color="#006400"
    //% weight=98
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic_Car(): number {
        let echoPin: DigitalPin = DigitalPin.P15;
        let trigPin: DigitalPin = DigitalPin.P14;
        pins.setPull(echoPin, PinPullMode.PullNone);
        pins.setPull(trigPin, PinPullMode.PullNone);
        // send pulse
        pins.digitalWritePin(trigPin, 0);
        control.waitMicros(5);
        pins.digitalWritePin(trigPin, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trigPin, 0);
        control.waitMicros(5);
        // read pulse
        let d = pins.pulseIn(echoPin, PulseValue.High, 11600);
        basic.pause(10);
        return d / 40;
        // send pulse
        //    pins.setPull(DigitalPin.P14, PinPullMode.PullNone);    
        //    pins.digitalWritePin(DigitalPin.P14, 0);
        //     control.waitMicros(2);
        //   pins.digitalWritePin(DigitalPin.P14, 1);
        //   control.waitMicros(10);
        //   pins.digitalWritePin(DigitalPin.P14, 0);

        // read pulse
        //   let d = pins.pulseIn(DigitalPin.P15, PulseValue.High, 43200);
        //  return d / 58;
    }
    //% blockId=siwt_Music_Car block="Music_Car|%index"
    //% weight=97
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Music_Car(index: enMusic): void {
        siwtch (index) {
            case enMusic.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case enMusic.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case enMusic.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case enMusic.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case enMusic.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case enMusic.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case enMusic.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case enMusic.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case enMusic.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case enMusic.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case enMusic.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case enMusic.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case enMusic.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case enMusic.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case enMusic.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case enMusic.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case enMusic.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case enMusic.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case enMusic.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case enMusic.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }
    //% blockId=siwt_Servo_Car block="Servo_Car|num %num|value %value |速度 %speed"
    //% weight=96
    //% blockGap=10
    //% speed.min=1 speed.max=10
    //% color="#006400"
    //% num.min=1 num.max=6 value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Servo_Car(num: enServo, value: number, speed: number): void {
        // 50hz: 20,000 us
        while (value_past != value) {
	   if(speed == 0)
	    {
		value_past = value;
		let us = (value_past * 1800 / 180 + 600); // 0.6 ~ 2.4
                let pwm = us * 4096 / 20000;
                setPwm(num + 2, 0, pwm);
	    }
	   else {
		  if (value_past > value) {
		      value_past - speed > value ? value_past -= speed : value_past--;
		      let us = (value_past * 1800 / 180 + 600); // 0.6 ~ 2.4
		      let pwm = us * 4096 / 20000;
		      setPwm(num + 2, 0, pwm);
		      basic.pause( 20);
		    }
            else if (value_past < value) {
                value_past + speed  < value ? value_past += speed : value_past++;
                let us = (value_past * 1800 / 180 + 600); // 0.6 ~ 2.4
                let pwm = us * 4096 / 20000;
                setPwm(num + 2, 0, pwm);
                basic.pause(20);
                }
	        {
                 let us = (value_past * 1800 / 180 + 600); // 0.6 ~ 2.4
                 let pwm = us * 4096 / 20000;
                 setPwm(num + 2, 0, pwm);
                }	
	    }   
        } 
    }
    //% blockId=siwt_Avoid_Sensor block="Avoid_Sensor|value %value"
    //% weight=95
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Avoid_Sensor(value: enAvoidState): boolean {
        let temp: boolean = false;
        //     pins.digitalWritePin(DigitalPin.P9, 0);
        siwtch (value) {
            case enAvoidState.OBSTACLE: {
                if (pins.analogReadPin(AnalogPin.P1) < 800) {
                    temp = true;
                    //   setPwm(8, 0, 0);
                }
                else {
                    temp = false;
                    //     setPwm(8, 0, 4095);
                }
                break;
            }
            case enAvoidState.NOOBSTACLE: {
                if (pins.analogReadPin(AnalogPin.P1) > 800) {
                    temp = true;
                    //     setPwm(8, 0, 4095);
                }
                else {
                    temp = false;
                    //    setPwm(8, 0, 0);
                }
                break;
            }
        }
        //    pins.digitalWritePin(DigitalPin.P9, 1);
        return temp;
    }
    //% blockId=siwt_Line_Sensor block="Line_Sensor|direct %direct|value %value"
    //% weight=94
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Line_Sensor(direct: enPos, value: enLineState): boolean {
        let temp: boolean = false;
        siwtch (direct) {
            case enPos.LeftState: {
                if (pins.analogReadPin(AnalogPin.P2) < 500) {
                    if (value == enLineState.White) {
                        temp = true;
                    }
                    setPwm(7, 0, 4095);
                }
                else {
                    if (value == enLineState.Black) {
                        temp = true;
                    }
                    setPwm(7, 0, 0);
                }
                break;
            }
            case enPos.RightState: {
                if (pins.analogReadPin(AnalogPin.P1) < 500) {
                    if (value == enLineState.White) {
                        temp = true;
                    }
                    setPwm(6, 0, 4095);
                }
                else {
                    if (value == enLineState.Black) {
                        temp = true;
                    }
                    setPwm(6, 0, 0);
                }
                break;
            }
        }
        return temp;
    }
    //% blockId=siwt_CarCtrl block="CarCtrl|%index"
    //% weight=93
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrl(index: CarState): void {
        siwtch (index) {
            case CarState.Car_Run: Car_run(255); break;
            case CarState.Car_Back: Car_back(255); break;
            case CarState.Car_Left: Car_left(255); break;
            case CarState.Car_Right: Car_right(255); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(255); break;
            case CarState.Car_SpinRight: Car_spinright(255); break;
        }
    }
    //% blockId=siwt_CarCtrlSpeed block="CarCtrlSpeed|%index|speed %speed"
    //% weight=92
    //% blockGap=10
    //% speed.min=0 speed.max=255
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrlSpeed(index: CarState, speed: number): void {
        siwtch (index) {
            case CarState.Car_Run: Car_run(speed); break;
            case CarState.Car_Back: Car_back(speed); break;
            case CarState.Car_Left: Car_left(speed); break;
            case CarState.Car_Right: Car_right(speed); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(speed); break;
            case CarState.Car_SpinRight: Car_spinright(speed); break;
        }
    }
    //% blockId=siwt_MotorRun block="MotorRun|%index0|%index1|speed%speed"
    //% weight=93
    //% blockGap=10
    //% speed.min=0 speed.max=255
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function MotorRun(index0: MotorNum, index1: MotorDir, speed: number) {
        if (index0 == MotorNum.Motor1) {
            if (index1 == MotorDir.clockwise) {
                setPwm(12, 0, speed*16);
                setPwm(13, 0, 0);
            }
            else if (index1 == MotorDir.anticlockwise) {
                setPwm(12, 0, 0);
                setPwm(13, 0, speed*16);
            }
        }
        else if (index0 == MotorNum.Motor0) {
            if (index1 == MotorDir.clockwise) {
                setPwm(14, 0, speed*16);
                setPwm(15, 0, 0);

            }
            else if (index1 == MotorDir.anticlockwise) {
                setPwm(15, 0, speed*16);
                setPwm(14, 0, 0);

            }
        }
    }
}
 
