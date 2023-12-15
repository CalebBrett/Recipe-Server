import time
import os
import RPi.GPIO as GPIO

ButtonRight=6 # yellow
ButtonLeft=24 # brown idk
ButtonL=17 # orange idk
ButtonR=5 # green idk
ButtonPower=27 # blue
# ButtonUp=23 Purple
# ButtonDown=22 Red
# Added up and down to /boot/config.txt
# dtoverlay=gpio-key, active_low=1,gpio=23,keycode=98,label=gpio_up,gpio_pull=up
# dtoverlay=gpio-key, active_low=1,gpio=22,keycode=104,label=gpio_down,gpio_pull=up

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(ButtonRight,GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(ButtonLeft,GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(ButtonR,GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(ButtonL,GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(ButtonPower,GPIO.IN, pull_up_down = GPIO.PUD_UP)

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
    print(GPIO.input(ButtonRight))

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
        KeypressButton=time.time()
        if DisplayOn==True:
            DisplayOn=False
            SetDisplay("RD7",False)
        else:
            DisplayOn=True
            SetDisplay("RD7",True)

GPIO.cleanup()
sys.exit()