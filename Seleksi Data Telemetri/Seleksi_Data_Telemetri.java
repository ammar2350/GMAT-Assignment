import java.util.Scanner;

public class Seleksi_Data_Telemetri {
    public static void main(String[] args){
        Scanner input = new Scanner(System.in);
        String idTeam = input.nextLine();
        int n = Integer.parseInt(input.nextLine());

        for (int i = 0; i < n; i++) {
            String[] data = input.nextLine().split(",");
            if (data.length != 6) {
                System.out.println("TIDAK");
                continue;
            }
            if (!data[0].equals(idTeam)) {
                System.out.println("TIDAK");
                continue;
            }
            String[] clock = data[1].split(":");
            if (clock.length != 3) {
                System.out.println("TIDAK");
                continue;
            }
            try {
                int hours = Integer.parseInt(clock[0]);
                int minutes = Integer.parseInt(clock[1]);
                int seconds = Integer.parseInt(clock[2]);
                if (!(0 <= hours && hours <= 23 && 0 <= minutes && minutes <= 59 && 0 <= seconds && seconds <= 59)) {
                    System.out.println("TIDAK");
                    continue;
                }
            } catch (NumberFormatException e) {
                System.out.println("TIDAK");
                continue;
            }
            for (int j = 3; j < 5; j++) {
                if (!data[j].matches("\\d+")) {
                    System.out.println("TIDAK");
                    break;
                }
            }
            if (data[5].endsWith(";")) {
                System.out.println("VALID");
            } else {
                System.out.println("TIDAK");
            }
        }
        input.close();
    }
}