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
KeyCooldown=0.3
DisplayOn=True

while True:
    time.sleep(0.1)

    # print(GPIO.input(ButtonUp),end="")
    # print("-",end="")
    # print(GPIO.input(ButtonDown))

    if GPIO.input(ButtonRight)==0 and time.time()-KeypressButton > KeyCooldown:
        KeypressButton=time.time()
        print("RIGHT")
        press_and_release('k')
    
    if GPIO.input(ButtonLeft)==0 and time.time()-KeypressButton > KeyCooldown:
        KeypressButton=time.time()
        print("Left")
        press_and_release('j')

    if GPIO.input(ButtonUp)==0:
        KeypressButton=time.time()
        print("Up")
        press_and_release('up')

    if GPIO.input(ButtonDown)==0:
        KeypressButton=time.time()
        print("Down")
        press_and_release('down')

    if GPIO.input(ButtonR)==0 and time.time()-KeypressButton > KeyCooldown:
        KeypressButton=time.time()
        print("R")
        # Unused currently

    if GPIO.input(ButtonL)==0 and time.time()-KeypressButton > KeyCooldown:
        KeypressButton=time.time()
        print("L")
        press_and_release('f5')

    if GPIO.input(ButtonPower)==0 and time.time()-KeypressButton > KeyCooldown:
        print("Power")
        KeypressButton=time.time()
        if DisplayOn==True:
            os.system("bash -c \"echo 1 > /sys/class/backlight/10-0045/bl_power\"")
            DisplayOn=False
        else:
            os.system("bash -c \"echo 0 > /sys/class/backlight/10-0045/bl_power\"")
            DisplayOn=True

# Unreachable
GPIO.cleanup()
sys.exit()

# TODO: if display off then dont do anything (and stop touch) Add new buttons and figure out better way to convert gpio to keyboard input Power off just turns backlight off should either sleep or disable input, also can turn brightness down or make it a button thing