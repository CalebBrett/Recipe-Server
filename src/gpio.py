import time
import os
import RPi.GPIO as GPIO
from pynput.keyboard import Key, Controller

ButtonRight=6 # yellow
ButtonLeft=24 # brown
ButtonL=17 # orange
ButtonR=5 # green
ButtonPower=27 # blue
ButtonUp=23 # purple
ButtonDown=22 # Red

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(ButtonRight,GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(ButtonLeft,GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(ButtonR,GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(ButtonL,GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(ButtonPower,GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(ButtonUp,GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(ButtonDown,GPIO.IN, pull_up_down = GPIO.PUD_UP)

keyboard = Controller()
KeypressButton=time.time()
KeyCooldown=0.5
DisplayOn=True

def SetDisplay(DisplayKind,DisplayOn):
    cmd=""
    # if DisplayKind=="HDMI": 
    #     if DisplayOn==True:
    #         cmd="xset dpms force on"
    #     else:
    #         cmd="xset dpms force off"
    if DisplayKind=="RD7": #Raspberry Pi Touch-Display 7"
        if DisplayOn==True:
            cmd="bash -c \"/home/caleb/display/display_on\""
        else:
            cmd="bash -c \"/home/caleb/display/display_off\""
    if cmd=="":
        print("Display-Status: "+str(DisplayOn))
        print(cmd)
        os.system(cmd)
        time.sleep(10)

while True:
    time.sleep(0.1)

    print(GPIO.input(ButtonUp) + "-" + GPIO.input(ButtonDown))

    if GPIO.input(ButtonRight)==0 and time.time()-KeypressButton>KeyCooldown:
        KeypressButton=time.time()
        print("RIGHT")
    
    if GPIO.input(ButtonLeft)==0 and time.time()-KeypressButton>KeyCooldown:
        KeypressButton=time.time()
        print("Left")

    if GPIO.input(ButtonR)==0 and time.time()-KeypressButton>KeyCooldown:
        KeypressButton=time.time()
        print("R")

    if GPIO.input(ButtonL)==0 and time.time()-KeypressButton>KeyCooldown:
        KeypressButton=time.time()
        print("L")

    if GPIO.input(ButtonPower)==0 and time.time()-KeypressButton>KeyCooldown:
        print("Power")
        KeypressButton=time.time()
        if DisplayOn==True:
            DisplayOn=False
            SetDisplay("RD7",False)
        else:
            DisplayOn=True
            SetDisplay("RD7",True)

    if GPIO.input(ButtonUp)==0 and time.time()-KeypressButton>KeyCooldown:
        KeypressButton=time.time()
        print("Up")
        # keyboard.press(Key.up)
        # keyboard.release(Key.up)

    if GPIO.input(ButtonDown)==0 and time.time()-KeypressButton>KeyCooldown:
        KeypressButton=time.time()
        print("Down")
        keyboard.press(Key.down)
        keyboard.release(Key.down)

GPIO.cleanup()
sys.exit()