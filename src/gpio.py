import time
import os
import RPi.GPIO as GPIO
from keyboard import press_and_release

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

KeypressButton=time.time()
KeyCooldown=0
DisplayOn=True

def SetDisplay(DisplayKind,DisplayOn):
    print("hi")
    if DisplayOn==True:
        cmd="bash -c \"/home/caleb/display/display_on\""
    else:
        cmd="bash -c \"/home/caleb/display/display_off\""
    print(cmd)
    os.system(cmd)
    time.sleep(10)

while True:
    time.sleep(0.1)

    # print(GPIO.input(ButtonUp),end="")
    # print("-",end="")
    # print(GPIO.input(ButtonDown))

    if GPIO.input(ButtonRight)==0 and time.time()-KeypressButton>KeyCooldown:
        KeypressButton=time.time()
        print("RIGHT")
    
    if GPIO.input(ButtonLeft)==0 and time.time()-KeypressButton>KeyCooldown:
        KeypressButton=time.time()
        print("Left")

    if GPIO.input(ButtonR)==0 and time.time()-KeypressButton>KeyCooldown:
        KeypressButton=time.time()
        print("R")
        press_and_release('up')

    if GPIO.input(ButtonL)==0 and time.time()-KeypressButton>KeyCooldown:
        KeypressButton=time.time()
        print("L")
        press_and_release('down')


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

    if GPIO.input(ButtonDown)==0 and time.time()-KeypressButton>KeyCooldown:
        KeypressButton=time.time()
        print("Down")

GPIO.cleanup()
sys.exit()