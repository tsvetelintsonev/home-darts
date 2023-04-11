import cv2
import numpy as np

from utils.debug import writeContourArea

class Field:

    def __init__(self, contour, x, y):
        self.contour = contour
        self.x = x
        self.y = y

image = cv2.imread("./images/dartboard.png")

hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
greyMask = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)

lowerGreen = np.array([35,50,50])
upperGreen = np.array([100,255,255])

lowerBlack = np.array([0,0,0])
upperBlack = np.array([180,255,55])

lowerRed1 = np.array([156,43,46])
upperRed1 = np.array([180,255,255])

# lowerRed1 = np.array([0,70,50])
# upperRed1 = np.array([45,255,255])

lowerRed2 = np.array([95,50,50])
upperRed2 = np.array([180,255,255])

kernel2 = np.ones((7,7),np.uint8)
kernel3 = np.ones((13,13),np.uint8)

roiMask = np.zeros(image.shape[:2], np.uint8)

# Black areas
blackMask = cv2.inRange(hsv, lowerBlack, upperBlack)
blackMask = cv2.morphologyEx(blackMask, cv2.MORPH_CLOSE, kernel2, iterations = 1)
blackMask = cv2.morphologyEx(blackMask, cv2.MORPH_OPEN, kernel2)

blackContours = []
contours, _ = cv2.findContours(blackMask, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
i = 0;
for cnt in contours:
    contourArea = cv2.contourArea(cnt)
    if (contourArea > 2000 and contourArea < 6000):
        hull = cv2.convexHull(cnt)
        cv2.drawContours(roiMask, [hull], 0, (255,255,255),1)
        M = cv2.moments(hull)
        cx = int(M['m10']/M['m00'])
        cy = int(M['m01']/M['m00'])
        blackContours.append(Field(hull, cx, cy))
        writeContourArea(roiMask, contourArea, cx, cy)
    # if (hierarchy.item(0,i,2) != -1) and (hierarchy.item(0,i,3) != -1) and (cv2.contourArea(cnt) > 700000):
    #     hull = cv2.convexHull(cnt)
    #     cv2.drawContours(roiMask, [hull], 0, (255,255,255),cv2.FILLED)
    # if (hierarchy.item(0, hierarchy.item(0,i,3),3) != -1) and (cv2.contourArea(contours[hierarchy.item(0,i,3)]) > 700000 and (cv2.contourArea(cnt) > 5000)):
    #     hull = cv2.convexHull(cnt)
    #     cv2.drawContours(image, [hull], 0, (255,0,0),1)
    #     M = cv2.moments(hull)
    #     cx = int(M['m10']/M['m00'])
    #     cy = int(M['m01']/M['m00'])
    #     black_contours.append(Field(hull, cx, cy))
    i = i + 1

# Green areas
greenMask = cv2.inRange(hsv, lowerGreen, upperGreen)
#greenMask = cv2.bitwise_and(greenMask, roiMask)
greenMask = cv2.morphologyEx(greenMask, cv2.MORPH_CLOSE, kernel2)
greenMask = cv2.morphologyEx(greenMask, cv2.MORPH_OPEN, kernel2)

greenContours = []
contours, _ = cv2.findContours(greenMask, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
i = 0;
for cnt in contours:
    contourArea = cv2.contourArea(cnt)
    #if (contourArea > 2000 and contourArea < 6000):
    hull = cv2.convexHull(cnt)
    cv2.drawContours(roiMask, [hull], 0, (255,255,255),1)
    M = cv2.moments(hull)
    cx = int(M['m10']/M['m00'])
    cy = int(M['m01']/M['m00'])
    greenContours.append(Field(hull, cx, cy))
    writeContourArea(roiMask, contourArea, cx, cy)

redMask = cv2.inRange(hsv, lowerRed1, upperRed1)
#redMask2 = cv2.inRange(hsv, lowerRed2, upperRed2)
#redMask = cv2.bitwise_or(redMask1, redMask2)
#redMask = cv2.bitwise_and(redMask, roiMask)
redMask = cv2.morphologyEx(redMask, cv2.MORPH_OPEN, kernel2)
redMask = cv2.morphologyEx(redMask, cv2.MORPH_CLOSE, kernel2)

cv2.imshow('redMask', redMask)
# cv2.imshow('greenMask', greenMask)
# cv2.imshow('blackMask', blackMask)
cv2.imshow('roiMask', roiMask)

#cv2.drawContours(image, contours, -1, color = (241,95,87), thickness = cv2.FILLED)
 
cv2.imshow('image', image)

cv2.waitKey(0)