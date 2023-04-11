import cv2

def writeContourArea(image, contourArea, x, y): 
    cv2.putText(image, str(contourArea), [x, y], cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255,255,255), 2, cv2.LINE_AA)