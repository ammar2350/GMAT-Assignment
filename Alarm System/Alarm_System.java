import java.util.Scanner;

public class Alarm_System {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int errorCode = input.nextInt();
        input.close();

        String binaryErrorCode = String.format("%5s", Integer.toBinaryString(errorCode)).replace(' ', '0');

        String[] errorMessages = {
            "Terjadi kegagalan pada descent rate Container",
            "Terjadi kegagalan pada descent rate Science Payload",
            "Terjadi kegagalan data posisi Container",
            "Terjadi kegagalan data posisi Science Payload",
            "Terjadi kegagalan release/separasi"
        };

        if (errorCode == 0) {
            System.out.println("Tidak terjadi kegagalan");
        }

        for (int i = 0; i < 5; i++) {
            if (binaryErrorCode.charAt(i) == '1') {
                System.out.println(errorMessages[i]);
            }
        }
    }
}
